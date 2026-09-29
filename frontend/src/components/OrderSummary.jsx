import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";

const STRIPE_KEY =
	import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
	"pk_test_51UKyTRLrYAnAW8AzfvuLVtdMXrWYnLPEwUqWOd3onOt3NXB86QxCPQ1cF3voZAXGaYsWxvke3L2ntD6ytxHEYJ4s00UaOA8slx";

const stripePromise = loadStripe(STRIPE_KEY);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		if (cart.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		try {
			setIsLoading(true);
			const res = await axios.post("/payments/create-checkout-session", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});

			const session = res.data;

			// Direct Stripe hosted checkout URL
			if (session.url) {
				window.location.href = session.url;
				return;
			}

			// Fallback to client SDK redirect
			const stripe = await stripePromise;
			if (stripe) {
				const result = await stripe.redirectToCheckout({
					sessionId: session.id,
				});
				if (result.error) {
					toast.error(result.error.message || "Checkout redirect failed");
				}
			} else {
				toast.error("Stripe initialization failed");
			}
		} catch (error) {
			console.error("Checkout error:", error);
			toast.error(error.response?.data?.message || error.message || "Failed to proceed to checkout");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-emerald-300 ${
						isLoading
							? "bg-gray-600 cursor-not-allowed opacity-75"
							: "bg-emerald-600 hover:bg-emerald-700"
					}`}
					whileHover={isLoading ? {} : { scale: 1.05 }}
					whileTap={isLoading ? {} : { scale: 0.95 }}
					onClick={handlePayment}
					disabled={isLoading}
				>
					{isLoading ? "Processing..." : "Proceed to Checkout"}
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
