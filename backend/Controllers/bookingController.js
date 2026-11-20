import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!doctor.ticketPrice) {
      return res.status(400).json({ success: false, message: "This doctor has not set a ticket price yet." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Both URLs must point to the React app, not to this API server
    const clientUrl = (process.env.CLIENT_SITE_URL || "http://localhost:5173").replace(/\/$/, "");

    // Stripe rejects empty strings / undefined values here, so only send what exists
    const productData = { name: doctor.name };
    if (doctor.bio) productData.description = doctor.bio;
    if (doctor.photo) productData.images = [doctor.photo];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${clientUrl}/checkout-success`,
      cancel_url: `${clientUrl}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            unit_amount: Math.round(Number(doctor.ticketPrice) * 100),
            product_data: productData,
          },
          quantity: 1,
        },
      ],
    });

    // Create a new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({ success: true, message: "Successfully paid", session });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ success: false, message: "Stripe session creation failed." });
  }
};
