import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function CheckoutModal({ isOpen, onClose, cart, deliveryDetails, giftMessage, context }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => {
    const priceNumber = String(item.price).replace(/[^\d]/g, "");
    return sum + ((Number(priceNumber) || 0) * (item.quantity || 1));
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 1 ? "Complete Your Order" : "Order Ready"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-gray-700">Delivery Information</h3>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm text-gray-900 placeholder-gray-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm text-gray-900 placeholder-gray-400" placeholder="077xxxxxxx" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm text-gray-900 placeholder-gray-400" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Delivery Address</label>
                    <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 text-sm h-20 resize-none text-gray-900 placeholder-gray-400" placeholder="123 Main St..." />
                  </div>
                </form>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-gray-700">Order Summary</h3>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 truncate mr-2">{item.quantity}x {item.name}</span>
                        <span className="font-medium text-gray-900">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">City</span>
                      <span className="font-medium text-gray-900">{context.city !== "Not identified" ? context.city : "Pending"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">{deliveryDetails.date}</span>
                    </div>
                    {giftMessage && (
                      <div className="pt-2">
                        <span className="text-xs text-gray-400 block mb-1">Gift Message:</span>
                        <p className="text-xs italic bg-white p-2 rounded border border-gray-100">"{giftMessage}"</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span className="text-[#C91508]">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle size={64} className="mx-auto text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">Ready to Place Order</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Thank you, {formData.name}. Your total is Rs. {total.toLocaleString()}. This is a mock checkout, so no real order was placed via MCP yet.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition">
            {step === 1 ? "Cancel" : "Close"}
          </button>
          {step === 1 && (
            <button form="checkout-form" type="submit" className="px-8 py-3 rounded-xl font-bold bg-[#C91508] text-white hover:bg-[#A81207] shadow-lg transition">
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
