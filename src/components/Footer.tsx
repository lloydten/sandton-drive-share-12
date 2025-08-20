import { Zap, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">JeHu EV Rental</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Sustainable electric vehicle rentals for apartment complex residents in Sandton, Johannesburg. 
              Making urban mobility cleaner and more convenient.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>Sandton, Johannesburg, South Africa</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+27 11 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>info@jehuev.co.za</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#vehicles" className="hover:text-white transition-colors">Our Vehicles</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#register" className="hover:text-white transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insurance Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Driver Requirements</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 JeHu EV Rental. All rights reserved. Making Sandton more sustainable, one ride at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;