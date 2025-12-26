"use client"
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  BarChart3,
} from "lucide-react";
import NextImage from "next/image";

const TOTAL_FRAMES = 45;
const DRAG_THRESHOLD = 8;

export default function CarListingPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [show360View, setShow360View] = useState(false);
  const [frame, setFrame] = useState(1);


  const [loanAmount, setLoanAmount] = useState(1060800);
  const [downPayment, setDownPayment] = useState(265200);
  const [loanDuration, setLoanDuration] = useState(66);

  const dragging = useRef(false);
  const lastX = useRef(0);

  const carImages = [
    "/carimages/car01.JPG",
    "/carimages/car02.JPG",
    "/carimages/car03.JPG",
    "/carimages/car04.JPG",
  ];

  const carDetails = {
    model: "Mahindra Thar",
    year: "2021",
    mileage: "28,000 km",
    price: "₹ 13,75,000",
    features: [
      "Hard Top",
      "4x4 Drivetrain",
      "Touchscreen Infotainment",
      "Cruise Control",
      "Alloy Wheels",
      "ABS",
      "Dual Airbags",
    ],
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carImages.length) % carImages.length);
  };


  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = 9.5 / 100 / 12; 
    const months = loanDuration;

    const emi =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  const emiPerMonth = calculateEMI();


  const updateFrame = (dir: string) => {
    setFrame((prev) =>
      dir === "right"
        ? prev === TOTAL_FRAMES
          ? 1
          : prev + 1
        : prev === 1
        ? TOTAL_FRAMES
        : prev - 1
    );
  };

  const startDrag = (x: number) => {
    dragging.current = true;
    lastX.current = x;
  };

  const onMove = (x: number) => {
    if (!dragging.current) return;
    const diff = x - lastX.current;
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      updateFrame(diff > 0 ? "right" : "left");
      lastX.current = x;
    }
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  
  useEffect(() => {
    if (show360View) {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/carimages/car${String(i).padStart(2, "0")}.JPG`;
      }
    }
  }, [show360View]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-purple-700">CarHub</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <NextImage
                width={500}
                height={400}
                  src={carImages[currentImage]}
                  alt={`Car view ${currentImage + 1}`}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* 360° View Button */}
                <button
                  onClick={() => setShow360View(true)}
                  className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition"
                >
                  <Maximize2 className="w-5 h-5" />
                  360° View
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentImage ? "bg-white w-6" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 p-4 bg-gray-50">
                {carImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-1 rounded-lg overflow-hidden border-2 transition ${
                      idx === currentImage
                        ? "border-purple-600"
                        : "border-transparent"
                    }`}
                  >
                    <NextImage
                    height={400}
                    width={500}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Overview Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Car Overview
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Model</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {carDetails.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {carDetails.year}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mileage</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {carDetails.mileage}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {carDetails.price}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-3">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {carDetails.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - EMI Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                EMI Calculator
              </h2>

              {/* Loan Amount */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-800">
                    Loan Amount
                  </label>
                  <span className="text-lg font-bold text-purple-700">
                    ₹ {loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="1326000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                      ((loanAmount - 100000) / (1326000 - 100000)) * 100
                    }%, #e5e7eb ${
                      ((loanAmount - 100000) / (1326000 - 100000)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹ 1,00,000</span>
                  <span>₹ 13,26,000</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-800">
                    Down Payment*
                  </label>
                  <span className="text-lg font-bold text-purple-700">
                    ₹ {downPayment.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1226000"
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                      (downPayment / 1226000) * 100
                    }%, #e5e7eb ${
                      (downPayment / 1226000) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹ 0</span>
                  <span>₹ 12,26,000</span>
                </div>
              </div>

              {/* Duration of Loan */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-800">
                    Duration of Loan
                  </label>
                  <span className="text-lg font-bold text-purple-700">
                    {loanDuration} Months
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="1"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                      ((loanDuration - 12) / (84 - 12)) * 100
                    }%, #e5e7eb ${
                      ((loanDuration - 12) / (84 - 12)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>12 Months</span>
                  <span>84 Months</span>
                </div>
              </div>

              {/* EMI Display */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-teal-600">
                    ₹ {emiPerMonth.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500">per month</span>
                </div>

                <button className="text-purple-700 font-semibold text-sm flex items-center gap-1 hover:underline mb-6">
                  <BarChart3 className="w-4 h-4" />
                  View Loan Breakup
                </button>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg shadow-lg transition flex items-center justify-center gap-2 mb-4">
                <span className="text-xl">₹</span>
                Check eligibility
              </button>

              {/* Disclaimers */}
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <p>
                  *Rate of interest can vary subject to credit profile. Loan
                  approval is at the sole discretion of the finance partner.
                </p>
                <p>**Processing fee and other loan charges are not included.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 360° View Modal */}
      {show360View && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShow360View(false)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative w-full mx-auto cursor-grab active:cursor-grabbing select-none bg-white rounded-lg overflow-hidden shadow-2xl"
              onMouseDown={(e) => startDrag(e.clientX)}
              onMouseMove={(e) => onMove(e.clientX)}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchMove={(e) => onMove(e.touches[0].clientX)}
              onTouchEnd={stopDrag}
            >
              <NextImage
              height={400}
              width={500}
                src={`/carimages/car${String(frame).padStart(2, "0")}.JPG`}
                alt="360 car view"
                draggable={false}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = carImages[0];
                }}
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                Drag to view 360°
              </div>

              <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                {frame} / {TOTAL_FRAMES}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
