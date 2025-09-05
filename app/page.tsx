import { Button } from "@/components/ui/button"
import { Atom, Grid3X3, Users, Calendar, MapPin, CreditCard, RotateCcw, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Atom className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">QUANTUM DAILY</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">All Episodes</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Meet the Hosts</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">FAQs</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-300 hover:text-white">Login</Button>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                <Users className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="text-blue-400 text-lg">Quantum Daily:</div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                The latest AI & quantum research, explained in{" "}
                <span className="text-white">plain English.</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                Quantum Daily is a premium daily newsletter and podcast. Each episode is lovingly crafted by hand, and delivered to your inbox every morning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-violet-600 hover:bg-violet-700 px-8 py-3 text-lg">
                  <Grid3X3 className="mr-2 h-5 w-5" />
                  Previous Episodes
                </Button>
                <Button variant="outline" className="border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white px-8 py-3 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Club
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Already a member? Click here to login.</span>
              </div>
            </div>
            
            {/* Right Content - Floating Papers */}
            <div className="relative h-96 lg:h-[500px]">
              {/* Paper 1 - Top Right */}
              <div className="absolute top-0 right-0 w-48 h-64 bg-white rounded-lg shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-8 bg-emerald-500 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-full"></div>
                    <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              
              {/* Paper 2 - Center */}
              <div className="absolute top-16 right-12 w-48 h-64 bg-white rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-6 bg-blue-500 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="h-16 bg-slate-100 rounded"></div>
                    <div className="h-16 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Paper 3 - Left */}
              <div className="absolute top-32 left-8 w-44 h-60 bg-white rounded-lg shadow-2xl transform rotate-45 hover:rotate-12 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-4 bg-purple-500 rounded mb-3"></div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                    <div className="h-1 bg-slate-300 rounded w-4/5"></div>
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                    <div className="h-1 bg-slate-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              
              {/* Paper 4 - Bottom Right */}
              <div className="absolute bottom-8 right-4 w-52 h-68 bg-white rounded-lg shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-6 bg-red-500 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                  </div>
                  <div className="mt-4">
                    <div className="h-20 bg-slate-100 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-slate-200 rounded w-full"></div>
                      <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Paper 5 - Bottom Left */}
              <div className="absolute bottom-0 left-16 w-46 h-62 bg-white rounded-lg shadow-2xl transform rotate-24 hover:rotate-12 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-5 bg-yellow-500 rounded mb-3"></div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                    <div className="h-1 bg-slate-300 rounded w-3/4"></div>
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Paper 6 - Top Left */}
              <div className="absolute top-4 left-0 w-44 h-58 bg-white rounded-lg shadow-2xl transform -rotate-24 hover:-rotate-12 transition-transform duration-300">
                <div className="p-4 h-full">
                  <div className="w-full h-4 bg-indigo-500 rounded mb-3"></div>
                  <div className="space-y-1">
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                    <div className="h-1 bg-slate-300 rounded w-4/5"></div>
                    <div className="h-1 bg-slate-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Atom className="h-5 w-5 text-blue-400" />
                <span className="font-bold">QUANTUM DAILY</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quantum Daily is a members-only podcast and streaming platform. Each episode is lovingly crafted by hand, by a team of subject-matter experts.
              </p>
            </div>
            
            {/* Navigation */}
            <div className="space-y-4">
              <div className="space-y-2">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Home</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">Episodes</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Hosts</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">FAQs</a>
              </div>
            </div>
            
            {/* Account */}
            <div className="space-y-4">
              <div className="space-y-2">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Sign Up</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Login</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Terms</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">Refunds</a>
              </div>
            </div>
            
            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Support / Feedback</h3>
              <p className="text-slate-400 text-sm">
                If you have any questions about the platform, or would like support with a purchase, feel free to reach out anytime:
              </p>
              <a href="mailto:support@quantumdaily.io" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                support@quantumdaily.io
              </a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-6 flex items-center justify-between text-slate-400 text-sm">
            <div>© 2025 QuantumDaily.io • All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}