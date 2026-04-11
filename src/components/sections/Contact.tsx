import { useState } from 'react';
import { SectionLayout } from '../layout/SectionLayout';
import { useTextReveal } from '../../hooks/useGsapHooks';

const Contact = () => {
  const headingRef = useTextReveal();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    try {
      // Using FormSubmit.co AJAX endpoint. 
      // NOTE: The very first time this fires, formsubmit.co will send an activation email to zunaid12star@gmail.com
      // The user must click the activation link in their inbox for subsequent emails to pass through automatically.
      const response = await fetch('https://formsubmit.co/ajax/zunaid12star@gmail.com', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Contact from ${formData.name}`,
          _template: 'box'
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', message: '' });
        }, 8000); // 8 seconds to read the message
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <SectionLayout id="contact" number="06" eyebrow="CONTACT">
      
      <div className="flex flex-col items-center text-center w-full max-w-[900px] mx-auto z-10 relative">
        {/* Top Headline */}
        <h2 ref={headingRef} className="font-display text-[clamp(44px,7vw,90px)] text-[#F0EBE1] font-black leading-[0.95] mb-4">
          Let's build something great together.
        </h2>
        
        <p className="font-body text-[16px] text-[#5C5C5C] mb-16 max-w-[600px] font-normal">
          Open to full-time roles, freelance projects, and collaborations.
        </p>

        {/* Contact Form / Success Message Container */}
        <div className="w-full max-w-[720px] mx-auto relative z-20 min-h-[350px]">
          
          {/* Animated Success Message */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center bg-[rgba(8,8,8,0.6)] backdrop-blur-sm border border-[rgba(200,169,110,0.2)] rounded-[6px] p-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-30
              ${status === 'success' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
            `}
          >
            <div className="w-16 h-16 bg-[rgba(200,169,110,0.1)] rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="font-display text-[28px] text-[#F0EBE1] mb-4">Message Sent Successfully!</h3>
            <p className="font-body text-[16px] text-[#C8A96E] leading-relaxed max-w-[500px]">
              Thanks for connect <span className="text-[#F0EBE1] font-medium">{formData.name || 'there'}</span>, I will ping you soon. Let's Build somethings great together and change the <span className="italic text-[#F0EBE1]">Idea/Thought <span className="text-[#5C5C5C]mx-1">→</span> Into Reality</span>.
            </p>
          </div>

          {/* Form */}
          <form 
            className={`flex flex-col gap-6 transition-all duration-500 ${status === 'success' ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`} 
            onSubmit={handleSubmit}
          >
            
            {/* ROW 1: Name and Email */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name" 
                className="flex-1 w-full bg-[rgba(255,255,255,0.02)] border border-[#2A2A2A] rounded-[6px] text-[#F0EBE1] font-body text-[15px] px-[20px] py-[16px] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,169,110,0.10)] transition-all duration-300 placeholder-[#3A3A3A]"
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email" 
                className="flex-1 w-full bg-[rgba(255,255,255,0.02)] border border-[#2A2A2A] rounded-[6px] text-[#F0EBE1] font-body text-[15px] px-[20px] py-[16px] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,169,110,0.10)] transition-all duration-300 placeholder-[#3A3A3A]"
              />
            </div>
            
            {/* ROW 2: Message */}
            <div className="w-full">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message" 
                className="w-full h-[160px] bg-[rgba(255,255,255,0.02)] border border-[#2A2A2A] rounded-[6px] text-[#F0EBE1] font-body text-[15px] px-[20px] py-[16px] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,169,110,0.10)] transition-all duration-300 resize-none placeholder-[#3A3A3A]"
              />
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="text-red-400 font-body text-[14px]">
                Failed to send message. Please try again or email directly.
              </div>
            )}

            {/* ROW 3: Submit */}
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="group relative overflow-hidden w-full h-[56px] bg-gold rounded-[6px] font-body font-medium text-[15px] text-[#080808] transition-all duration-350 active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-wait"
            >
              <div className="absolute inset-0 bg-[#F0EBE1] clip-path-wipe-right opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out z-0" />
              <span className="relative z-10 flex items-center justify-center pointer-events-none">
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span></>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* BOTTOM: Icon Row */}
        <div className="mt-20 flex flex-row items-center justify-center gap-5 relative z-20">
          <IconButton href="mailto:md.zunaid.ali@gmail.com" tooltip="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </IconButton>

          <IconButton href="tel:+918252300728" tooltip="Phone">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </IconButton>

          <IconButton href="https://github.com/zunaidali-728" target="_blank" tooltip="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </IconButton>

          <IconButton href="https://linkedin.com/in/md-zunaid-ali-315bb8229" target="_blank" tooltip="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </IconButton>
        </div>

      </div>
    </SectionLayout>
  );
};

const IconButton = ({ children, href, target, tooltip }: { children: React.ReactNode, href: string, target?: string, tooltip: string }) => (
  <a 
    href={href}
    target={target}
    rel={target === '_blank' ? 'noreferrer' : undefined}
    className="group relative w-[52px] h-[52px] flex items-center justify-center rounded-full border border-[#2A2A2A] text-[#5C5C5C] bg-transparent hover:border-gold hover:text-gold hover:scale-[1.12] transition-all duration-250 ease-out"
  >
    {children}
    {/* Tooltip */}
    <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-[rgba(200,169,110,0.12)] border border-[rgba(200,169,110,0.3)] rounded-[4px] px-[10px] py-[4px] whitespace-nowrap text-gold font-body text-[11px]">
      {tooltip}
    </div>
  </a>
);

export default Contact;
