"use client";

import type React from "react";

import { useCart } from "@/context/cart-context";
import { PaySZNProvider, PaymentButton, PaymentModalWrapper } from "payszn-sdk";
import { useState } from "react";
import { Check, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const totalAmount = getCartTotal() + 0.01; // Adding network fee

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 mb-6">
          <ShoppingBag className="h-12 w-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          You need to add some items to your cart before checking out.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Checkout Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex flex-col items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              activeStep >= 1
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            {activeStep > 1 ? <Check className="h-5 w-5" /> : 1}
          </div>
          <span className="mt-2 text-sm font-medium">Shipping</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`h-1 w-full ${
              activeStep >= 2 ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
            }`}
          ></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              activeStep >= 2
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            {activeStep > 2 ? <Check className="h-5 w-5" /> : 2}
          </div>
          <span className="mt-2 text-sm font-medium">Payment</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`h-1 w-full ${
              activeStep >= 3 ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
            }`}
          ></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              activeStep >= 3
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            3
          </div>
          <span className="mt-2 text-sm font-medium">Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          {activeStep === 1 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Shipping Information
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2 border-t border-slate-200 dark:border-slate-700 pt-4">
                      <h3 className="font-medium mb-4">Shipping Address</h3>
                    </div>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium mb-2"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium mb-2"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium mb-2"
                      >
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mb-2"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Payment Method
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-600 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-blue-800 dark:text-blue-300">
                    Pay with USDC on Solana
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Make a secure payment using USDC on the Solana blockchain.
                    Fast, low fees, and decentralized.
                  </p>

                  <PaySZNProvider
                    apiKey="api_7800fcec-8a6e-478f-beb3-abfbdd805ac7"
                    initialAmount={totalAmount}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-xs mb-4">
                        <PaymentButton />
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Powered by PaySZN - Secure Solana Payments
                      </p>
                      <PaymentModalWrapper />
                    </div>
                  </PaySZNProvider>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Back to Shipping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-start">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {item.product.price} USDC
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Subtotal
                  </span>
                  <span>{getCartTotal().toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Network Fee
                  </span>
                  <span>0.01 USDC</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {totalAmount.toFixed(2)} USDC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
