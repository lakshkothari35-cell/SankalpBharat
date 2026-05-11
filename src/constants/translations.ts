
export type Language = 'EN' | 'HI' | 'GU' | 'MR' | 'BN' | 'TA' | 'TE' | 'KN' | 'ML' | 'PA' | 'UR' | 'SA';

export interface TranslationSchema {
  dir: 'ltr' | 'rtl';
  name: string;
  nativeName: string;
  nav: {
    vision: string;
    causes: string;
    donation: string;
    connect: string;
    mission: string;
    map: string;
    transparency: string;
  };
  hero: {
    initiative: string;
    together: string;
    serving: string;
    transforming: string;
    india: string;
    description: string;
    donate: string;
    volunteer: string;
  };
  causes: {
    pillars: string;
    empowering: string;
    humanity: string;
    priority: string;
    sacred: string;
    progress: string;
    reached: string;
    titles: {
      education: string;
      women: string;
      hunger: string;
      health: string;
      sustainability: string;
      disaster: string;
      animal: string;
    };
  };
  donation: {
    title: string;
    realChange: string;
    description: string;
    secured: string;
    choose: string;
    amountLabel: string;
    custom: string;
    paymentPath: string;
    process: string;
    report: string;
  };
  volunteer: {
    title: string;
    karmayogi: string;
    description: string;
    formTitle: string;
    name: string;
    email: string;
    area: string;
    location: string;
    submit: string;
  }
}

export const translations: Record<Language, TranslationSchema> = {
  EN: {
    dir: 'ltr',
    name: 'English',
    nativeName: 'English',
    nav: {
      vision: 'Our Vision',
      causes: 'Seva Areas',
      donation: 'Contribution',
      connect: 'Connect',
      mission: 'Mission',
      map: 'Impact Map',
      transparency: 'Transparency',
    },
    hero: {
      initiative: 'Nationwide Impact Initiative',
      together: 'Together For A Better India',
      serving: 'Serving Humanity • Hope For Every Home',
      transforming: 'Transforming',
      india: 'India.',
      description: 'Inspired by our ancient values of unity and selfless service, Sankalp Bharat is dedicated to transforming millions of lives through education, healthcare, and rural empowerment.',
      donate: 'Donate Today',
      volunteer: 'Volunteer',
    },
    causes: {
      pillars: 'Pillars of Seva',
      empowering: 'Empowering',
      humanity: 'Humanity',
      priority: 'Priority Initiative',
      sacred: 'Sacred Mission',
      progress: 'Impact Progress',
      reached: 'Reached',
      titles: {
        education: 'Child Education',
        women: 'Women Empowerment',
        hunger: 'Hunger Relief',
        health: 'Healthcare',
        sustainability: 'Sustainability',
        disaster: 'Disaster Relief',
        animal: 'Animal Welfare'
      }
    },
    donation: {
      title: 'Your contribution creates ',
      realChange: 'real change',
      description: '100% of your donation goes directly to the field. We use ancient wisdom of transparency to ensure every rupee reaches the souls who need it most.',
      secured: 'Secured by Sacred Integrity',
      choose: 'Sanctify Your Support',
      amountLabel: 'Choose Amount (₹)',
      custom: 'SPECIFY CONTRIBUTION',
      paymentPath: 'Payment Path',
      process: 'Perform Daana',
      report: 'Every Seva is Tracked in Our Living Transparency Ledger',
    },
    volunteer: {
      title: 'Become a ',
      karmayogi: 'Karmayogi',
      description: 'Join a community of 25,000+ souls dedicated to selfless service.',
      formTitle: 'Sacred Registration',
      name: 'Full Name',
      email: 'Email Path',
      area: 'Area of Seva',
      location: 'Location',
      submit: 'Submit Interest',
    }
  },
  HI: {
    dir: 'ltr',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    nav: {
      vision: 'हमारा दृष्टिकोण',
      causes: 'सेवा क्षेत्र',
      donation: 'योगदान',
      connect: 'जुड़ें',
      mission: 'मिशन',
      map: 'प्रभाव मानचित्र',
      transparency: 'पारदर्शिता',
    },
    hero: {
      initiative: 'देशव्यापी प्रभाव पहल',
      together: 'एक बेहतर भारत के लिए साथ',
      serving: 'मानवता की सेवा • हर घर के लिए आशा',
      transforming: 'परिवर्तनकारी',
      india: 'भारत।',
      description: 'एकता और निस्वार्थ सेवा के हमारे प्राचीन मूल्यों से प्रेरित होकर, संकल्प भारत शिक्षा, स्वास्थ्य सेवा और ग्रामीण सशक्तिकरण के माध्यम से लाखों जीवन बदलने के लिए समर्पित है।',
      donate: 'आज दान करें',
      volunteer: 'स्वयंसेवक बनें',
    },
    causes: {
      pillars: 'सेवा के स्तंभ',
      empowering: 'सशक्तिकरण',
      humanity: 'मानवता',
      priority: 'प्राथमिकता पहल',
      sacred: 'पवित्र मिशन',
      progress: 'प्रभाव प्रगति',
      reached: 'पहुंच गया',
      titles: {
        education: 'बाल शिक्षा',
        women: 'महिला सशक्तिकरण',
        hunger: 'भूख राहत',
        health: 'स्वास्थ्य सेवा',
        sustainability: 'सतत विकास',
        disaster: 'आपदा राहत',
        animal: 'पशु कल्याण'
      }
    },
    donation: {
      title: 'आपका योगदान करता है ',
      realChange: 'वास्तविक परिवर्तन',
      description: 'आपका 100% दान सीधे क्षेत्र में जाता है। हम पारदर्शिता के प्राचीन ज्ञान का उपयोग यह सुनिश्चित करने के लिए करते हैं कि हर रुपया उन आत्माओं तक पहुंचे जिन्हें इसकी सबसे अधिक आवश्यकता है।',
      secured: 'पवित्र अखंडता द्वारा सुरक्षित',
      choose: 'अपने समर्थन को पवित्र करें',
      amountLabel: 'राशि चुनें (₹)',
      custom: 'योगदान निर्दिष्ट करें',
      paymentPath: 'भुगतान पथ',
      process: 'दान करें',
      report: 'हर सेवा हमारे लाइव पारदर्शिता लेजर में ट्रैक की जाती है',
    },
    volunteer: {
      title: 'बनें एक ',
      karmayogi: 'कर्मयोगी',
      description: 'निस्वार्थ सेवा के लिए समर्पित 25,000+ आत्माओं के समुदाय में शामिल हों।',
      formTitle: 'पवित्र पंजीकरण',
      name: 'पूరా नाम',
      email: 'ईमेल पथ',
      area: 'सेवा क्षेत्र',
      location: 'स्थान',
      submit: 'रुचि सबमिट करें',
    }
  },
  GU: {
    dir: 'ltr',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    nav: {
      vision: 'અમારું વિઝન',
      causes: 'સેવા ક્ષેત્રો',
      donation: 'ફાળો',
      connect: 'જોડાઓ',
      mission: 'મિશન',
      map: 'ઇમ્પેક્ટ મેપ',
      transparency: 'પારદર્શિતા',
    },
    hero: {
      initiative: 'દેશવ્યાપી અસર પહેલ',
      together: 'વધુ સારા ભારત માટે સાથે',
      serving: 'માનવતાની સેવા • દરેક ઘર માટે આશા',
      transforming: 'પરિવર્તનકારી',
      india: 'ભારત.',
      description: 'એકતા અને નિઃસ્વાર્થ સેવાના આપણા પ્રાચીન મૂલ્યોથી પ્રેરિત, સંકલ્પ ભારત શિક્ષણ, આરોગ્ય સંભાળ અને ગ્રામીણ સશક્તિકરણ દ્વારા લાખો જીવન બદલવા માટે સમર્પિત છે.',
      donate: 'આજે દાન કરો',
      volunteer: 'સ્વયંસેવક',
    },
    causes: {
      pillars: 'સેવાના સ્તંભો',
      empowering: 'સશક્તિકરણ',
      humanity: 'માનવતા',
      priority: 'પ્રાધાન્યતા પહેલ',
      sacred: 'પવિત્ર મિશન',
      progress: 'અસર પ્રગતિ',
      reached: 'પહોંચ્યાં',
      titles: {
        education: 'બાળ શિક્ષણ',
        women: 'મહિલા સશક્તિકરણ',
        hunger: 'ભૂખ રાહત',
        health: 'આરોગ્ય સંભાળ',
        sustainability: 'ટકાઉપણું',
        disaster: 'આપત્તિ રાહત',
        animal: 'પ્રાણી કલ્યાણ'
      }
    },
    donation: {
      title: 'તમારું યોગદાન આપે છે ',
      realChange: 'વાસ્તવિક પરિવર્તન',
      description: 'તમારા દાનનું 100% સીધું ફિલ્ડમાં જાય છે. અમે પારદર્શિતાના પ્રાચીન જ્ઞાનનો ઉપયોગ કરીએ છીએ જેથી ખાતરી કરી શકાય કે દરેક રૂપિયો જે આત્માઓને તેની સૌથી વધુ જરૂર છે ત્યાં સુધી પહોંચે.',
      secured: 'પવિત્ર અખંડિતતા દ્વારા સુરક્ષિત',
      choose: 'તમારા સમર્થનને પવિત્ર કરો',
      amountLabel: 'રકમ પસંદ કરો (₹)',
      custom: 'દાન સ્પષ્ટ કરો',
      paymentPath: 'ચુકવણી માર્ગ',
      process: 'દાન કરો',
      report: 'દરેક સેવા આપણા લિવિંગ ટ્રાન્સપરન્સી લેજરમાં ટ્રેક કરવામાં આવે છે',
    },
    volunteer: {
      title: 'બનો એક ',
      karmayogi: 'કર્મયોગી',
      description: 'નિઃસ્વાર્થ સેવા માટે સમર્પિત 25,000+ આત્માઓના સમુદાયમાં જોડાઓ.',
      formTitle: 'પવિત્ર નોંધણી',
      name: 'પૂરું નામ',
      email: 'ઇમેઇલ માર્ગ',
      area: 'સેવાનું ક્ષેત્ર',
      location: 'સ્થાન',
      submit: 'રસ સબમિટ કરો',
    }
  },
  TA: {
    dir: 'ltr',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    nav: {
      vision: 'எங்கள் பார்வை',
      causes: 'சேவை பகுதிகள்',
      donation: 'பங்களிப்பு',
      connect: 'இணையுங்கள்',
      mission: 'திட்டம்',
      map: 'தாக்க வரைபடம்',
      transparency: 'வெளிப்படைத்தன்மை',
    },
    hero: {
      initiative: 'நாடு தழுவிய தாக்க முயற்சி',
      together: 'சிறந்த இந்தியாவிற்கு ஒன்றாக',
      serving: 'மனிதநேய சேவை • ஒவ்வொரு வீட்டிற்கும் நம்பிக்கை',
      transforming: 'மாற்றத்தை உண்டாக்குதல்',
      india: 'இந்தியா.',
      description: 'ஒற்றுமை மற்றும் தன்னலமற்ற சேவையின் எமது பண்டைய விழுமியங்களால் ஈர்க்கப்பட்டு, கல்வி, சுகாதாரம் மற்றும் கிராமப்புற அதிகாரமளித்தல் மூலம் மில்லியன் கணக்கான வாழ்க்கையை மாற்ற சங்கல்ப் பாரத் உறுதிபூண்டுள்ளது.',
      donate: 'இன்று தானம் செய்யுங்கள்',
      volunteer: 'தன்னார்வலர் ஆக',
    },
    causes: {
      pillars: 'சேவை தூண்கள்',
      empowering: 'அதிகாரமளித்தல்',
      humanity: 'மனிதநேயம்',
      priority: 'முன்னுரிமை முயற்சி',
      sacred: 'புனித பணி',
      progress: 'தாக்க முன்னேற்றம்',
      reached: 'அடைந்தது',
      titles: {
        education: 'குழந்தை கல்வி',
        women: 'பெண் அதிகாரமளித்தல்',
        hunger: 'பசி நிவாரணம்',
        health: 'சுகாதாரம்',
        sustainability: 'நிலைத்தன்மை',
        disaster: 'பேரிடர் நிவாரணம்',
        animal: 'விலங்கு நலன்'
      }
    },
    donation: {
      title: 'உங்கள் பங்களிப்பு உருவாக்குகிறது ',
      realChange: 'உண்மையான மாற்றம்',
      description: 'உங்கள் நன்கொடையில் 100% நேரடியாக களத்திற்கு செல்கிறது. ஒவ்வொரு ரூபாயும் மிகவும் தேவைப்படும் ஆன்மாக்களை சென்றடைவதை உறுதி செய்ய வெளிப்படைத்தன்மையின் பண்டைய அறிவைப் பயன்படுத்துகிறோம்.',
      secured: 'புனித நேர்மையால் பாதுகாக்கப்பட்டது',
      choose: 'உங்கள் ஆதரவை புனிதப்படுத்தவும்',
      amountLabel: 'தொகையைத் தேர்ந்தெடுக்கவும் (₹)',
      custom: 'பங்களிப்பைக் குறிப்பிடுங்கள்',
      paymentPath: 'கட்டண பாதை',
      process: 'தானம் செய்யுங்கள்',
      report: 'ஒவ்வொரு சேவையும் எங்கள் நேரடி வெளிப்படைத்தன்மை லெட்ஜரில் கண்காணிக்கப்படுகிறது',
    },
    volunteer: {
      title: 'ஒருவராகுங்கள் ',
      karmayogi: 'கர்மயோகி',
      description: 'தன்னலமற்ற சேவைக்காக அர்ப்பணிக்கப்பட்ட 25,000+ ஆன்மாக்களின் சமூகத்தில் சேருங்கள்.',
      formTitle: 'புனித பதிவு',
      name: 'முழு பெயர்',
      email: 'மின்னஞ்சல் பாதை',
      area: 'சேவை பகுதி',
      location: 'இடம்',
      submit: 'விருப்பத்தை சமர்ப்பிக்கவும்',
    }
  },
  UR: {
    dir: 'rtl',
    name: 'Urdu',
    nativeName: 'اردو',
    nav: {
      vision: 'ہمارا مشن',
      causes: 'خدمت کے شعبے',
      donation: 'تعاون',
      connect: 'رابطہ کریں',
      mission: 'مشن',
      map: 'اثرات کا نقشہ',
      transparency: 'شفافیت',
    },
    hero: {
      initiative: 'ملک گیر اثرات کی مہم',
      together: 'بہتر بھارت کے لیے متحد',
      serving: 'انسانیت کی خدمت • ہر گھر کے لیے امید',
      transforming: 'تبدیلی',
      india: 'بھارت۔',
      description: 'متحدہ اور بے لوث خدمت کی قدیم اقدار سے تحریک پا کر، سنکلپ بھارت تعلیم، صحت اور دیہی خود مختاری کے ذریعے لاکھوں زندگیاں بدلنے کے لیے کوشاں ہے۔',
      donate: 'آج عطیہ کریں',
      volunteer: 'رضاکار بنیں',
    },
    causes: {
      pillars: 'خدمت کے ستون',
      empowering: 'خود مختاری',
      humanity: 'انسانیت',
      priority: 'ترجیحی مہم',
      sacred: 'مقدس مشن',
      progress: 'اثرات کی پیش رفت',
      reached: 'ٹارگٹ',
      titles: {
        education: 'بچوں کی تعلیم',
        women: 'خواتین کی خود مختاری',
        hunger: 'فاقہ کشی کا خاتمہ',
        health: 'صحت کی سہولیات',
        sustainability: 'پائیداری',
        disaster: 'آفات میں امداد',
        animal: 'جانوروں کی بہبود'
      }
    },
    donation: {
      title: 'آپ کا تعاون لاتا ہے ',
      realChange: 'حقیقی تبدیلی',
      description: 'آپ کے عطیہ کا 100 فیصد براہ راست فیلڈ میں جاتا ہے۔ ہم شفافیت کے قدیم طریقے استعمال کرتے ہیں تاکہ ہر روپیہ مستحقین تک پہنچ سکے۔',
      secured: 'مقدس دیانتداری سے محفوظ',
      choose: 'اپنی حمایت کو تقویت دیں',
      amountLabel: 'رقم کا انتخاب کریں (₹)',
      custom: 'تعاون کی رقم لکھیں',
      paymentPath: 'ادائیگی کا راستہ',
      process: 'صدقہ دیں',
      report: 'ہر خدمت ہمارے شفاف لیجر میں درج کی جاتی ہے',
    },
    volunteer: {
      title: 'بنیں ایک ',
      karmayogi: 'کرم یوگی',
      description: 'بے لوث خدمت کے لیے وقف 25,000 سے زائد افراد کی کمیونٹی میں شامل ہوں۔',
      formTitle: 'مقدس رجسٹریشن',
      name: 'پورا نام',
      email: 'ای میل',
      area: 'خدمت کا شعبہ',
      location: 'مقام',
      submit: 'دلچسپی ظاہر کریں',
    }
  },
  SA: {
    dir: 'ltr',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    nav: {
      vision: 'अस्माकं दर्शनम्',
      causes: 'सेवाक्षेत्राणि',
      donation: 'योगदानम्',
      connect: 'सम्पर्कः',
      mission: 'लक्ष्यम्',
      map: 'प्रभावमानचित्रम्',
      transparency: 'पारदर्शिता',
    },
    hero: {
      initiative: 'राष्ट्रव्यापी प्रभाव प्रकल्पः',
      together: 'उत्तमभारताय मिलित्वा',
      serving: 'मानवतासेवा • प्रतिगृहं आशा',
      transforming: 'परिवर्तनम्',
      india: 'भारतम्।',
      description: 'एकतायाः निःस्वार्थसेवायाः च अस्माकं प्राचीनमूल्यैः प्रेरितः, संकल्पभारतः शिक्षा-स्वास्थ्य-ग्रामीणसशक्तिकरणद्वारा लक्षशः जीवनानां परिवर्तनाय समर्पितः अस्ति।',
      donate: 'अद्यैव दानं कुरुत',
      volunteer: 'स्वयंसेवकः भवतु',
    },
    causes: {
      pillars: 'सेवास्तम्भाः',
      empowering: 'सशक्तिकरणम्',
      humanity: 'मानवता',
      priority: 'प्रमुखसेवा',
      sacred: 'पावनं मिशनम्',
      progress: 'प्रभावप्रगतिः',
      reached: 'सम्प्राप्तम्',
      titles: {
        education: 'बालशिक्षा',
        women: 'महिलासशक्तिकरणम्',
        hunger: 'क्षुधानिवारणम्',
        health: 'स्वास्थ्यरक्षा',
        sustainability: 'स्थायित्वम्',
        disaster: 'आपत्कालीनसहायता',
        animal: 'पशुकल्याणम्'
      }
    },
    donation: {
      title: 'भवतः योगदानं करोति ',
      realChange: 'वास्तविकपरिवर्तनम्',
      description: 'भवतः १००% दानं साक्षात् क्षेत्रं गच्छति। वयम् पारदर्शितायाः प्राचीनज्ञानस्य प्रयोगं कुर्मः येन सुनिश्चितं भवति यत् प्रत्येकं रूप्यकं आवश्यकजनेभ्यः प्राप्नोতি।',
      secured: 'पवित्रनिष्ठाया सुरक्षितम्',
      choose: 'स्वसहयोगं पावनं कुरुत',
      amountLabel: 'राशिं चिनोतु (₹)',
      custom: 'योगदानं निर्दिशतु',
      paymentPath: 'भुगतानमार्गः',
      process: 'दानं कुरुत',
      report: 'प्रतिसेवा अस्माकं जीवन्तपारदर्शितालेखायां अङ्किता भवति',
    },
    volunteer: {
      title: 'भवतु एकः ',
      karmayogi: 'कर्मयोगी',
      description: 'निःस्वार्थसेवायै समर्पितस्य २५,०००+ जनानां गणस्य सदस्यः भवतु।',
      formTitle: 'पवित्रपञ्जीकरणम्',
      name: 'पूर्णनाम',
      email: 'विपत्रमार्गः',
      area: 'सेवाक्षेत्रम्',
      location: 'स्थानम्',
      submit: 'रुचिं प्रकटयतु',
    }
  },
  MR: {
    dir: 'ltr',
    name: 'Marathi',
    nativeName: 'मराठी',
    nav: {
      vision: 'आमची दृष्टी',
      causes: 'सेवा क्षेत्रे',
      donation: 'योगदान',
      connect: 'संपर्क',
      mission: 'धोरण',
      map: 'प्रभाव नकाशा',
      transparency: 'पारदर्शकता',
    },
    hero: {
      initiative: 'देशव्यापी प्रभाव उपक्रम',
      together: 'उत्तम भारतासाठी एकत्र',
      serving: 'मानवतेची सेवा • प्रत्येक घरासाठी आशा',
      transforming: 'परिवर्तन',
      india: 'भारत.',
      description: 'एकता आणि निस्वार्थ सेवेच्या आपल्या प्राचीन मूल्यांपासून प्रेरित होऊन, संकल्प भारत शिक्षण, आरोग्य सेवा आणि ग्रामीण सక్షमीकरणाद्वारे लाखो जीवन बदलण्यासाठी समर्पित आहे.',
      donate: 'आजच दान करा',
      volunteer: 'स्वयंसेवक व्हा',
    },
    causes: {
      pillars: 'सेवेचे स्तंभ',
      empowering: 'सक्षमीकरण',
      humanity: 'मानवता',
      priority: 'प्राधान्य उपक्रम',
      sacred: 'पवित्र मिशन',
      progress: 'प्रभाव प्रगती',
      reached: 'पोहोचले',
      titles: {
        education: 'बाल शिक्षण',
        women: 'महिला सक्षमीकरण',
        hunger: 'भूक निवारण',
        health: 'आरोग्य सेवा',
        sustainability: 'शाश्वतता',
        disaster: 'आपत्ती निवारण',
        animal: 'प्राणी कल्याण'
      }
    },
    donation: {
      title: 'तुमचे योगदान घडवते ',
      realChange: 'वास्तविक बदल',
      description: 'तुमचे १००% दान थेट क्षेत्रातील कामासाठी वापरले जाते. प्रत्येक रुपया गरजूंपर्यंत पोहोचण्यासाठी आम्ही पारदर्शकतेच्या प्राचीन ज्ञानाचा वापर करतो.',
      secured: 'पवित्र अखंडतेने सुरक्षित',
      choose: 'तुमच्या समर्थनाचे पावन करा',
      amountLabel: 'रक्कम निवडा (₹)',
      custom: 'योगदान नमूद करा',
      paymentPath: 'पेमेंट मार्ग',
      process: 'दान करा',
      report: 'प्रत्येक सेवा आमच्या पारदर्शक लेजरमध्ये ट्रॅक केली जाते',
    },
    volunteer: {
      title: 'व्हा एक ',
      karmayogi: 'कर्मयोगी',
      description: 'निस्वार्थ सेवेसाठी समर्पित २५,००० हून अधिक व्यक्तींच्या समुदायात सामील व्हा.',
      formTitle: 'पवित्र नोंदणी',
      name: 'पूर्ण नाव',
      email: 'ईमेल मार्ग',
      area: 'सेवेचे क्षेत्र',
      location: 'स्थान',
      submit: 'इच्छा नोंदवा',
    }
  },
  BN: {
    dir: 'ltr',
    name: 'Bengali',
    nativeName: 'বাংলা',
    nav: {
      vision: 'আমাদের দৃষ্টিভঙ্গি',
      causes: 'সেবার ক্ষেত্র',
      donation: 'দান',
      connect: 'যোগাযোগ',
      mission: 'মিশন',
      map: 'প্রভাব মানচিত্র',
      transparency: 'স্বচ্ছতা',
    },
    hero: {
      initiative: 'দেশব্যাপী প্রভাব উদ্যোগ',
      together: 'উন্নত ভারতের জন্য একসাথে',
      serving: 'মানবতার সেবা • প্রতিটি ঘরের জন্য আশা',
      transforming: 'পরিবর্তনশীল',
      india: 'ভারত।',
      description: 'ঐক্য এবং নিঃস্বার্থ সেবার প্রাচীন মূল্যবোধ দ্বারা অনুপ্রাণিত হয়ে, সংকল্প ভারত শিক্ষা, স্বাস্থ্য পরিষেবা এবং গ্রামীণ ক্ষমতায়নের মাধ্যমে লক্ষ লক্ষ জীবন পরিবর্তনের জন্য নিবেদিত।',
      donate: 'আজই দান করুন',
      volunteer: 'স্বেচ্ছাসেবী হন',
    },
    causes: {
      pillars: 'সেবার স্তম্ভ',
      empowering: 'ক্ষমতায়ন',
      humanity: 'মানবতা',
      priority: 'অগ্রাধিকার উদ্যোগ',
      sacred: 'পবিত্র মিশন',
      progress: 'প্রভাব অগ্রগতি',
      reached: 'পৌঁছানো গেছে',
      titles: {
        education: 'শিশু শিক্ষা',
        women: 'নারী ক্ষমতায়ন',
        hunger: 'ক্ষুধা নিবৃত্তি',
        health: 'স্বাস্থ্য পরিষেবা',
        sustainability: 'স্থায়িত্ব',
        disaster: 'দুর্যোগ প্রশমন',
        animal: 'প্রাণী কল্যাণ'
      }
    },
    donation: {
      title: 'আপনার অবদান সৃষ্টি করে ',
      realChange: 'প্রকৃত পরিবর্তন',
      description: 'আপনার দানের ১০০% সরাসরি ক্ষেত্রে ব্যবহৃত হয়। প্রতিটি টাকা যেন উপযুক্ত ব্যক্তির কাছে পৌঁছায় তা নিশ্চিত করতে আমরা স্বচ্ছতার প্রাচীন জ্ঞান ব্যবহার করি।',
      secured: 'পবিত্র অখণ্ডতা দ্বারা সুরক্ষিত',
      choose: 'আপনার সমর্থনকে পবিত্র করুন',
      amountLabel: 'পরিমাণ নির্বাচন করুন (₹)',
      custom: 'পরিমাণ উল্লেখ করুন',
      paymentPath: 'পেমেন্ট পাথ',
      process: 'দান করুন',
      report: 'প্রতিটি সেবা আমাদের সরাসরি স্বচ্ছতা লেজারে ট্র্যাক করা হয়',
    },
    volunteer: {
      title: 'হয়ে উঠুন একজন ',
      karmayogi: 'কর্মযোগী',
      description: 'নিঃস্বার্থ সেবার জন্য নিবেদিত ২৫,০০০+ মানুষের সম্প্রদায়ে যোগ দিন।',
      formTitle: 'পবিত্র নিবন্ধন',
      name: 'পুরো নাম',
      email: 'ইমেল পথ',
      area: 'সেবার ক্ষেত্র',
      location: 'স্থান',
      submit: 'আগ্রহ জানান',
    }
  },
  TE: {
    dir: 'ltr',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    nav: {
      vision: 'మా దార్శనికత',
      causes: 'సేవా రంగాలు',
      donation: 'విరాళం',
      connect: 'కలవండి',
      mission: 'మిషన్',
      map: 'ప్రభావ పటం',
      transparency: 'పారదర్శకత',
    },
    hero: {
      initiative: 'దేశవ్యాప్త ప్రభావ కార్యక్రమం',
      together: 'మెరుగైన భారత్ కోసం కలిసి',
      serving: 'మానవతా సేవ • ప్రతి ఇంటికీ ఆశ',
      transforming: 'పరివర్తన',
      india: 'భారత్.',
      description: 'ఐక్యత మరియు నిస్వార్థ సేవ అనే మన ప్రాచీన విలువల నుండి ప్రేరణ పొందిన సంకల్ప భారత్, విద్య, ఆరోగ్యం మరియు గ్రామీణ సాధికారత ద్వారా లక్షలాది జీవితాలను మార్చడానికి అంకితమైంది.',
      donate: 'ఈరోజే విరాళం ఇవ్వండి',
      volunteer: 'వాలంటీర్ అవ్వండి',
    },
    causes: {
      pillars: 'సేవా స్తంభాలు',
      empowering: 'సాధికారత',
      humanity: 'మానవత్వం',
      priority: 'ప్రాధాన్యత కార్యక్రమం',
      sacred: 'పవిత్ర మిషన్',
      progress: 'ప్రభావ పురోగతి',
      reached: 'చేరుకుంది',
      titles: {
        education: 'బాలల విద్య',
        women: 'మహిళా సాధికారత',
        hunger: 'ఆకలి నివారణ',
        health: 'ఆరోగ్య సంరక్షణ',
        sustainability: 'సుస్థిరత',
        disaster: 'విపత్తు సహాయం',
        animal: 'జంతు సంక్షేమం'
      }
    },
    donation: {
      title: 'మీ విరాళం ',
      realChange: 'నిజమైన మార్పును',
      description: 'మీ విరాళం 100% నేరుగా క్షేత్రస్థాయికి చేరుతుంది. ప్రతి రూపాయి అవసరమైన వారికి చేరుతుందని నిర్ధారించడానికి మేము ప్రాచీన పారదర్శకతను పాటిస్తాము.',
      secured: 'పవిత్ర సమగ్రతతో రక్షించబడింది',
      choose: 'మీ మద్దతును పవిత్రం చేయండి',
      amountLabel: 'మొత్తాన్ని ఎంచుకోండి (₹)',
      custom: 'మొత్తాన్ని నమోదు చేయండి',
      paymentPath: 'చెల్లింపు విధానం',
      process: 'దానం చేయండి',
      report: 'ప్రతి సేవ మా పారదర్శకత లెడ్జర్‌లో నమోదు చేయబడుతుంది',
    },
    volunteer: {
      title: 'అవ్వండి ఒక ',
      karmayogi: 'కర్మయోగి',
      description: 'నిస్వార్థ సేవ కోసం అంకితమైన 25,000+ మంది సభ్యుల సమూహంలో చేరండి.',
      formTitle: 'పవిత్ర నమోదు',
      name: 'పూర్తి పేరు',
      email: 'ఈమెయిల్',
      area: 'సేవా రంగం',
      location: 'ప్రాంతం',
      submit: 'ఆసక్తిని తెలియజేయండి',
    }
  },
  KN: {
    dir: 'ltr',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    nav: {
      vision: 'ನಮ್ಮ ದೃಷ್ಟಿಕೋನ',
      causes: 'ಸೇವಾ ಕ್ಷೇತ್ರಗಳು',
      donation: 'ದೇಣಿಗೆ',
      connect: 'ಸಂಪರ್ಕಿಸಿ',
      mission: 'ಧ್ಯೇಯ',
      map: 'ಪ್ರಭಾವ ನಕ್ಷೆ',
      transparency: 'ಪಾರದರ್ಶಕತೆ',
    },
    hero: {
      initiative: 'ದೇಶವ್ಯಾಪಿ ಪ್ರಭಾವ ಯೋಜನೆ',
      together: 'ಉತ್ತಮ ಭಾರತಕ್ಕಾಗಿ ಒಟ್ಟಾಗಿ',
      serving: 'ಮಾನವೀಯ ಸೇವೆ • ಪ್ರತಿ ಮನೆಗೆ ಆಶೆ',
      transforming: 'ಪರಿವರ್ತನೆ',
      india: 'ಭಾರತ.',
      description: 'ಏಕತೆ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ನಮ್ಮ ಪ್ರಾಚೀನ ಮೌಲ್ಯಗಳಿಂದ ಪ್ರೇರಿತರಾದ ಸಂಕಲ್ಪ ಭಾರತ, ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ ಮತ್ತು ಗ್ರಾಮೀణ ಸಬಲೀಕರಣದ ಮೂಲಕ ಲಕ್ಷಾಂತರ ಜೀವನಗಳನ್ನು ಬದಲಾಯಿಸಲು ಸಮರ್ಪಿತವಾಗಿದೆ.',
      donate: 'ಇಂದೇ ದೇಣಿಗೆ ನೀಡಿ',
      volunteer: 'ಸ್ವಯಂಸೇವಕರಾಗಿ',
    },
    causes: {
      pillars: 'ಸೇವಾ ಸ್ತಂಭಗಳು',
      empowering: 'ಸಬಲೀಕರಣ',
      humanity: 'ಮಾನವೀಯತೆ',
      priority: 'ಆದ್ಯತಾ ಯೋಜನೆ',
      sacred: 'ಪವಿತ್ರ ಮಿಷನ್',
      progress: 'ಪ್ರಭಾವ ಪ್ರಗತಿ',
      reached: 'ತಲುಪಿದೆ',
      titles: {
        education: 'ಮಕ್ಕಳ ಶಿಕ್ಷಣ',
        women: 'ಮಹಿಳಾ ಸಬಲೀಕರಣ',
        hunger: 'ಹಸಿವು ನಿವಾರಣೆ',
        health: 'ಆರೋಗ್ಯ ಸೇವೆ',
        sustainability: 'ಸುಸ್ಥಿರತೆ',
        disaster: 'ವಿಪತ್ತು ಪರಿಹಾರ',
        animal: 'ಪ್ರಾಣಿ ಕಲ್ಯಾಣ'
      }
    },
    donation: {
      title: 'ನಿಮ್ಮ ದೇಣಿಗೆ ',
      realChange: 'ನಿಜವಾದ ಬದಲಾವಣೆ',
      description: 'ನಿಮ್ಮ ದೇಣಿಗೆಯ 100% నేరుగా કાર્યಕ್ಷೇತ್ರಕ್ಕೆ ತಲುಪುತ್ತದೆ. ಪ್ರತಿ ರೂಪಾಯಿಯೂ ಅಗತ್ಯವಿರುವವರನ್ನು ತಲುಪುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಾವು ಪಾರದರ್ಶಕತೆಯ ಪ್ರಾಚೀನ ಜ್ಞಾನವನ್ನು ಬಳಸುತ್ತೇವೆ.',
      secured: 'ಪವಿತ್ರ ಸಮಗ್ರತೆಯಿಂದ ಸುರಕ್ಷಿತ',
      choose: 'ನಿಮ್ಮ ಬೆಂಬಲವನ್ನು ಪವಿತ್ರಗೊಳಿಸಿ',
      amountLabel: 'ಮೊತ್ತವನ್ನು ಆರಿಸಿ (₹)',
      custom: 'ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ',
      paymentPath: 'ಪಾವತಿ ಮಾರ್ಗ',
      process: 'ದಾನ ಮಾಡಿ',
      report: 'ಪ್ರತಿ ಸೇವೆಯು ನಮ್ಮ ಪಾರದರ್ಶಕ ದಾಖಲೆಗಳಲ್ಲಿ ದಾಖಲಾಗುತ್ತದೆ',
    },
    volunteer: {
      title: 'ಆಗಿ ಒಬ್ಬ ',
      karmayogi: 'ಕರ್ಮಯೋಗಿ',
      description: 'ನಿಸ್ವಾರ್ಥ ಸೇವೆಗಾಗಿ ಸಮರ್ಪಿತರಾಗಿರುವ 25,000+ ಜನರ ಗುಂಪಿಗೆ ಸೇರಿ.',
      formTitle: 'ಪವಿತ್ರ ನೋಂದಣಿ',
      name: 'ಪೂರ್ಣ ಹೆಸರು',
      email: 'ಇಮೇಲ್ ಮಾರ್ಗ',
      area: 'ಸೇವಾ ಕ್ಷೇತ್ರ',
      location: 'ಸ್ಥಳ',
      submit: 'ಆಸಕ್ತಿ ಸಲ್ಲಿಸಿ',
    }
  },
  ML: {
    dir: 'ltr',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    nav: {
      vision: 'ഞങ്ങളുടെ കാഴ്ചപ്പാട്',
      causes: 'സേവന മേഖലകൾ',
      donation: 'സംഭാവന',
      connect: 'ബന്ധപ്പെടുക',
      mission: 'ലക്ഷ്യം',
      map: 'ഇംപാക്ട് മാപ്പ്',
      transparency: 'സുതാര്യത',
    },
    hero: {
      initiative: 'രാജ്യവ്യാപക സ്വാധീന പദ്ധതി',
      together: 'മെച്ചപ്പെട്ട ഇന്ത്യക്കായി ഒന്നായി',
      serving: 'മാനവിക സേവനം • ഓരോ വീടിനും പ്രത്യാശ',
      transforming: 'പരിവർത്തനം',
      india: 'ഇന്ത്യ.',
      description: 'ഐക്യത്തിന്റെയും നിസ്വാർത്ഥ സേവനത്തിന്റെയും പുരാതന മൂല്യങ്ങളിൽ നിന്ന് പ്രചോദനം ഉൾക്കൊണ്ട്, വിദ്യാഭ്യാസം, ആരോഗ്യം, ഗ്രാമീണ ശാക്തീകരണം എന്നിവയിലൂടെ ലക്ഷക്കണക്കിന് ജീവിതങ്ങൾ മാറ്റുന്നതിന് സങ്കൽപ്പ് ഭാരത് പ്രതിജ്ഞാബദ്ധമാണ്.',
      donate: 'ഇന്ന് സംഭാവന ചെയ്യുക',
      volunteer: 'സന്നദ്ധപ്രവർത്തകനാകുക',
    },
    causes: {
      pillars: 'സേവന സ്തംഭങ്ങൾ',
      empowering: 'ശാക്തീകരണം',
      humanity: 'മാനവികത',
      priority: 'മുൻഗണനാ പദ്ധതി',
      sacred: 'വിശുദ്ധ ദൗത്യം',
      progress: 'സ്വാധീന പുരോഗതി',
      reached: 'എത്തിച്ചേർന്നു',
      titles: {
        education: 'ശിശു വിദ്യാഭ്യാസം',
        women: 'വനിതാ ശാക്തീകരണം',
        hunger: 'വിശപ്പടക്കൽ',
        health: 'ആരോഗ്യ സംരക്ഷണം',
        sustainability: 'സുസ്ഥിരത',
        disaster: 'ദുരന്ത നിവാരണം',
        animal: 'മൃഗക്ഷേമം'
      }
    },
    donation: {
      title: 'നിങ്ങളുടെ സംഭാവന ',
      realChange: 'യഥാർത്ഥ മാറ്റം',
      description: 'നിങ്ങളുടെ സംഭാവനയുടെ 100% നേരിട്ട് ഗുണഭോക്താക്കളിലേക്ക് എത്തുന്നു. ഓരോ രൂപയും ആവശ്യക്കാരിലേക്ക് എത്തുന്നുണ്ടെന്ന് ഉറപ്പാക്കാൻ സുതാര്യതയുടെ പുരാതന അറിവ് ഞങ്ങൾ ഉപയോഗിക്കുന്നു.',
      secured: 'പാവനമായ സത്യസന്ധതയാൽ സുരക്ഷിതം',
      choose: 'നിങ്ങളുടെ പിന്തുണ സഫലമാക്കുക',
      amountLabel: 'തുക തിരഞ്ഞെടുക്കുക (₹)',
      custom: 'തുക രേഖപ്പെടുത്തുക',
      paymentPath: 'പേയ്‌മെന്റ് രീതി',
      process: 'ദാനം ചെയ്യുക',
      report: 'ഓരോ സേവനവും ഞങ്ങളുടെ സുതാര്യത രജിസ്റ്ററിൽ രേഖപ്പെടുത്തുന്നു',
    },
    volunteer: {
      title: 'ആകൂ ഒരു ',
      karmayogi: 'കർമ്മയോഗി',
      description: 'നിസ്വാർത്ഥ സേവനത്തിനായി സമർപ്പിതരായ 25,000+ അംഗങ്ങളുടെ കൂട്ടായ്മയിൽ ചേരുക.',
      formTitle: 'വിശുദ്ധമായ രജിസ്ട്രേഷൻ',
      name: 'പൂർണ്ണനാമം',
      email: 'ഇമെയിൽ',
      area: 'സേവന മേഖല',
      location: 'സ്ഥലം',
      submit: 'താല്പര്യം അറിയിക്കുക',
    }
  },
  PA: {
    dir: 'ltr',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    nav: {
      vision: 'ਸਾਡਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ',
      causes: 'ਸੇਵਾ ਦੇ ਖੇਤਰ',
      donation: 'ਦਾਨ',
      connect: 'ਸੰਪਰਕ ਕਰੋ',
      mission: 'ਮਿਸ਼ਨ',
      map: 'ਪ੍ਰਭਾਵ ਨਕਸ਼ਾ',
      transparency: 'ਪਾਰਦਰਸ਼ਤਾ',
    },
    hero: {
      initiative: 'ਦੇਸ਼ਵਿਆਪੀ ਪ੍ਰਭਾਵ ਪਹਿਲ',
      together: 'ਬਿਹਤਰ ਭਾਰਤ ਲਈ ਇਕੱਠੇ',
      serving: 'ਮਨੁੱਖਤਾ ਦੀ ਸੇਵਾ • ਹਰ ਘਰ ਲਈ ਉਮੀਦ',
      transforming: 'ਪਰਿਵਰਤਨ',
      india: 'ਭਾਰਤ।',
      description: 'ਏਕਤਾ ਅਤੇ ਨਿਰਸਵਾਰਥ ਸੇਵਾ ਦੇ ਸਾਡੇ ਪੁਰਾਣੇ ਮੁੱਲਾਂ ਤੋਂ ਪ੍ਰੇਰਿਤ ਹੋ ਕੇ, ਸੰਕਲਪ ਭਾਰਤ ਸਿੱਖਿਆ, ਸਿਹਤ ਸੰਭਾਲ ਅਤੇ ਪੇਂਡੂ ਸਸ਼ਕਤੀਕਰਨ ਰਾਹੀਂ ਲੱਖਾਂ ਜਿੰਦਗੀਆਂ ਬਦਲਣ ਲਈ ਸਮਰਪਿਤ ਹੈ।',
      donate: 'ਅੱਜ ਦਾਨ ਕਰੋ',
      volunteer: 'ਵਲੰਟੀਅਰ ਬਣੋ',
    },
    causes: {
      pillars: 'ਸੇਵਾ ਦੇ ਸਤੰਭ',
      empowering: 'ਸਸ਼ਕਤੀਕਰਨ',
      humanity: 'ਮਨੁੱਖਤਾ',
      priority: 'ਤਰਜੀਹੀ ਪਹਿਲ',
      sacred: 'ਪਵਿੱਤਰ ਮਿਸ਼ਨ',
      progress: 'ਪ੍ਰਭਾਵ ਪ੍ਰਗਤੀ',
      reached: 'ਪਹੁੰਚਿਆ',
      titles: {
        education: 'ਬਾਲ ਸਿੱਖਿਆ',
        women: 'ਮਹਿਲਾ ਸਸ਼ਕਤੀਕਰਨ',
        hunger: 'ਭੁੱਖ ਰਾਹਤ',
        health: 'ਸਿਹਤ ਸੰਭਾਲ',
        sustainability: 'ਸਥਿਰਤਾ',
        disaster: 'ਆਫ਼ਤ ਰਾਹਤ',
        animal: 'ਪਸ਼ੂ ਭਲਾਈ'
      }
    },
    donation: {
      title: 'ਤੁਹਾਡਾ ਯੋਗਦਾਨ ਲਿਆਉਂਦਾ ਹੈ ',
      realChange: 'ਅਸਲ ਤਬਦੀਲੀ',
      description: 'ਤੁਹਾਡੇ ਦਾਨ ਦਾ 100% ਸਿੱਧਾ ਫੀਲਡ ਵਿੱਚ ਜਾਂਦਾ ਹੈ। ਅਸੀਂ ਪਾਰਦਰਸ਼ਤਾ ਦੇ ਪੁਰਾਣੇ ਗਿਆਨ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ ਤਾਂ ਜੋ ਇਹ ਯਕੀਨੀ ਬਣਾਇਆ ਜਾ ਸਕੇ ਕਿ ਹਰ ਰੁਪਿਆ ਲੋੜਵੰਦਾਂ ਤੱਕ ਪਹੁੰਚੇ।',
      secured: 'ਪਵਿੱਤਰ ਇਮਾਨਦਾਰੀ ਨਾਲ ਸੁਰੱਖਿਅਤ',
      choose: 'ਆਪਣੇ ਸਮਰਥਨ ਨੂੰ ਪਵਿੱਤਰ ਕਰੋ',
      amountLabel: 'ਰਕਮ ਚੁਣੋ (₹)',
      custom: 'ਰਕਮ ਦੱਸੋ',
      paymentPath: 'ਭੁਗਤਾਨ ਦਾ ਰਸਤਾ',
      process: 'ਦਾਨ ਕਰੋ',
      report: 'ਹਰ ਸੇਵਾ ਸਾਡੇ ਪਾਰਦਰਸ਼ੀ ਲੇਜ਼ਰ ਵਿੱਚ ਟ੍ਰੈਕ ਕੀਤੀ ਜਾਂਦੀ ਹੈ',
    },
    volunteer: {
      title: 'ਬਣੋ ਇੱਕ ',
      karmayogi: 'ਕਰਮਯੋਗੀ',
      description: 'ਨਿਰਸਵਾਰਥ ਸੇਵਾ ਲਈ ਸਮਰਪਿਤ 25,000+ ਲੋਕਾਂ ਦੇ ਭਾਈਚਾਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।',
      formTitle: 'ਪਵਿੱਤਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
      name: 'ਪੂਰਾ ਨਾਮ',
      email: 'ਈਮੇਲ ਮਾਰਗ',
      area: 'ਸੇਵਾ ਦਾ ਖેਤਰ',
      location: 'ਸਥਾਨ',
      submit: 'ਦਿਲਚਸਪੀ ਦਿਖਾਓ',
    }
  }
};
