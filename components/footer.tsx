import { Logo } from "./logo";

export function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Logo /><p>सत्य, सन्तुलित र विश्वसनीय पत्रकारितामार्फत समाजलाई सुसूचित बनाउने हाम्रो प्रतिबद्धता।</p></div><div><h3>समाचार</h3><a href="#">राजनीति</a><a href="#">अर्थ</a><a href="#">खेलकुद</a><a href="#">विश्व</a></div><div><h3>सूत्रधार</h3><a href="#">हाम्रो बारेमा</a><a href="#">सम्पर्क</a><a href="#">विज्ञापन</a><a href="#">गोपनीयता</a></div><div><h3>सम्पर्क</h3><p>काठमाडौं, नेपाल<br />news@sutradhaar.com<br />+९७७ ०१-XXXXXXX</p></div></div><div className="copyright">© २०८३ सूत्रधार न्यूज। सर्वाधिकार सुरक्षित।</div></footer>;
}
