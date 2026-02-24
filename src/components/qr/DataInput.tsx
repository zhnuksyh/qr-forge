import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Wifi, User, Mail, MessageSquare, Type } from 'lucide-react';

type DataType = 'url' | 'text' | 'wifi' | 'email' | 'sms' | 'vcard';

interface DataInputProps {
  setQRData: (data: string) => void;
}

const DATA_TYPES: { id: DataType; label: string; icon: React.ReactNode }[] = [
  { id: 'url', label: 'URL', icon: <LinkIcon className="w-4 h-4" /> },
  { id: 'text', label: 'Text', icon: <Type className="w-4 h-4" /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
  { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'vcard', label: 'vCard', icon: <User className="w-4 h-4" /> },
];

// Wi-Fi QR format: WIFI:T:WPA;S:NetworkName;P:Password;;
const encodeWifi = (ssid: string, password: string, encryption: string, hidden: boolean) =>
  `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;

// Email QR format: mailto:email?subject=...&body=...
const encodeEmail = (to: string, subject: string, body: string) => {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`;
};

// SMS QR format: smsto:number:message
const encodeSms = (phone: string, message: string) =>
  `smsto:${phone}:${message}`;

// vCard QR format
const encodeVcard = (name: string, phone: string, email: string, org: string) =>
  `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;

const inputClass = "w-full p-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium";
const labelClass = "text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider";

export const DataInput: React.FC<DataInputProps> = ({ setQRData }) => {
  const [dataType, setDataType] = useState<DataType>('url');

  // URL state
  const [url, setUrl] = useState('https://example.com');
  // Text state
  const [text, setText] = useState('');
  // Wi-Fi state
  const [ssid, setSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);
  // Email state
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  // SMS state
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  // vCard state
  const [vcName, setVcName] = useState('');
  const [vcPhone, setVcPhone] = useState('');
  const [vcEmail, setVcEmail] = useState('');
  const [vcOrg, setVcOrg] = useState('');

  // Encode and push data to parent whenever inputs change
  useEffect(() => {
    let encoded = '';
    switch (dataType) {
      case 'url': encoded = url; break;
      case 'text': encoded = text; break;
      case 'wifi': encoded = encodeWifi(ssid, wifiPass, encryption, hidden); break;
      case 'email': encoded = encodeEmail(emailTo, emailSubject, emailBody); break;
      case 'sms': encoded = encodeSms(smsPhone, smsMessage); break;
      case 'vcard': encoded = encodeVcard(vcName, vcPhone, vcEmail, vcOrg); break;
    }
    setQRData(encoded);
  }, [dataType, url, text, ssid, wifiPass, encryption, hidden, emailTo, emailSubject, emailBody, smsPhone, smsMessage, vcName, vcPhone, vcEmail, vcOrg]);

  return (
    <div data-tour="data-input" className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 dark:shadow-black/20 relative overflow-hidden group transition-colors duration-300">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all duration-700"></div>
      
      <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-slate-800 dark:text-white relative z-10">
        <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-blue-600 dark:text-blue-400">
          <LinkIcon className="w-5 h-5" />
        </div>
        Content Data
      </h2>
      
      <div className="space-y-5 relative z-10">
        {/* Data Type Selector */}
        <div className="space-y-3">
          <label className={labelClass}>Data Type</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {DATA_TYPES.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setDataType(dt.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold transition-all border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  dataType === dt.id
                    ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 dark:border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10 dark:shadow-blue-900/10'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {dt.icon}
                {dt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Fields */}
        {dataType === 'url' && (
          <div className="space-y-3">
            <label className={labelClass}>Target URL</label>
            <input 
              type="text" value={url} onChange={(e) => setUrl(e.target.value)}
              className={inputClass} placeholder="https://yourwebsite.com"
            />
          </div>
        )}

        {dataType === 'text' && (
          <div className="space-y-3">
            <label className={labelClass}>Plain Text</label>
            <textarea 
              value={text} onChange={(e) => setText(e.target.value)}
              className={inputClass + " resize-none h-32"} placeholder="Enter any text..."
            />
          </div>
        )}

        {dataType === 'wifi' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className={labelClass}>Network Name (SSID)</label>
              <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} className={inputClass} placeholder="MyNetwork" />
            </div>
            <div className="space-y-3">
              <label className={labelClass}>Password</label>
              <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} className={inputClass} placeholder="Password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className={labelClass}>Encryption</label>
                <select value={encryption} onChange={(e) => setEncryption(e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className={labelClass}>Hidden Network</label>
                <button 
                  onClick={() => setHidden(!hidden)}
                  className={`w-full p-4 rounded-xl font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    hidden 
                      ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 dark:border-blue-500/50 text-blue-600 dark:text-blue-400' 
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  {hidden ? 'Yes' : 'No'}
                </button>
              </div>
            </div>
          </div>
        )}

        {dataType === 'email' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className={labelClass}>Recipient</label>
              <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className={inputClass} placeholder="someone@example.com" />
            </div>
            <div className="space-y-3">
              <label className={labelClass}>Subject</label>
              <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className={inputClass} placeholder="Subject line" />
            </div>
            <div className="space-y-3">
              <label className={labelClass}>Body</label>
              <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className={inputClass + " resize-none h-24"} placeholder="Email body..." />
            </div>
          </div>
        )}

        {dataType === 'sms' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className={labelClass}>Phone Number</label>
              <input type="tel" value={smsPhone} onChange={(e) => setSmsPhone(e.target.value)} className={inputClass} placeholder="+1234567890" />
            </div>
            <div className="space-y-3">
              <label className={labelClass}>Message</label>
              <textarea value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} className={inputClass + " resize-none h-24"} placeholder="Your message..." />
            </div>
          </div>
        )}

        {dataType === 'vcard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className={labelClass}>Full Name</label>
                <input type="text" value={vcName} onChange={(e) => setVcName(e.target.value)} className={inputClass} placeholder="John Doe" />
              </div>
              <div className="space-y-3">
                <label className={labelClass}>Organization</label>
                <input type="text" value={vcOrg} onChange={(e) => setVcOrg(e.target.value)} className={inputClass} placeholder="Acme Corp" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className={labelClass}>Phone</label>
                <input type="tel" value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} className={inputClass} placeholder="+1234567890" />
              </div>
              <div className="space-y-3">
                <label className={labelClass}>Email</label>
                <input type="email" value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} className={inputClass} placeholder="john@example.com" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
