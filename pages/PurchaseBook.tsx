import { ShieldCheck, BookOpen, Smartphone, ArrowRight, CheckCircle } from "lucide-react";

export default function PurchaseBook() {
  // The link you provided
  const PURCHASE_URL = "https://api.aspiraedge.com/api/purchasebook";

  return (
    <div className="relative w-full h-full min-h-[80vh] flex items-center justify-center overflow-hidden py-12">
      
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 text-center border-b border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
                <BookOpen size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Book Store Portal</h1>
              <p className="text-muted-foreground">
                Securely purchase books and sync them to your app
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8 md:p-10 space-y-8">
              
              {/* Info Alert for iOS Users */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4">
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                    iOS Users
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    Due to store policies, purchases are handled via our secure web portal. 
                    Once purchased, books will <strong>automatically appear</strong> in your app when you log in with the same credentials.
                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Why purchase here?
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-sm">Instant access across all devices</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-sm">Secure Razorpay payment gateway</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-sm">Lowest price guarantee (No store fees)</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={PURCHASE_URL}
                  // Using target="_blank" is often better for payment gateways so they don't lose the main tab
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg group"
                >
                  <span>Proceed to Purchase</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={14} />
                  <span>256-bit SSL Secure Payment</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}