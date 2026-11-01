/**
 * SCHOOL ERP — ADVANCED MULTI-LANGUAGE OFFLINE i18n SYSTEM (i18n.js)
 * 100% Offline, Real-Time Mutation Observer & Deep DOM Scanner
 * Supported Languages: English (en), Hindi (hi), Marathi (mr), Kannada (kn), Urdu (ur)
 */

(function () {
  'use strict';

  // Supported Language Manifest
  const LANGUAGES = {
    en: { name: 'English', native: 'English', dir: 'ltr', flag: '🇺🇸' },
    hi: { name: 'Hindi', native: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
    mr: { name: 'Marathi', native: 'मराठी', dir: 'ltr', flag: '🇮🇳' },
    kn: { name: 'Kannada', native: 'ಕನ್ನಡ', dir: 'ltr', flag: '🇮🇳' },
    ur: { name: 'Urdu', native: 'اردو', dir: 'rtl', flag: '🇮🇳' }
  };

  // Comprehensive Educational ERP Dictionary
  const DICTIONARY = {
    // --- Navigation & Core Modules ---
    'Dashboard': { hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', ur: 'ڈیش بورڈ' },
    'Admissions & Enquiry': { hi: 'प्रवेश एवं पूछताछ', mr: 'प्रवेश आणि चौकशी', kn: 'ಪ್ರವೇಶಗಳು ಮತ್ತು ವಿಚಾರಣೆ', ur: 'داخلہ اور معلومات' },
    'Student Information': { hi: 'विद्यार्थी जानकारी', mr: 'विद्यार्थी माहिती', kn: 'ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ', ur: 'طالب علم کی معلومات' },
    'Teacher Management': { hi: 'शिक्षक प्रबंधन', mr: 'शिक्षक व्यवस्थापन', kn: 'ಶಿಕ್ಷಕರ ನಿರ್ವಹಣೆ', ur: 'اساتذہ کا انتظام' },
    'Staff Management': { hi: 'कर्मचारी प्रबंधन', mr: 'कर्मचारी व्यवस्थापन', kn: 'ಸಿಬ್ಬಂದಿ ನಿರ್ವಹಣೆ', ur: 'عملے کا انتظام' },
    'Attendance Logs': { hi: 'उपस्थिति रिकॉर्ड', mr: 'उपस्थिती नोंदी', kn: 'ಹಾಜರಾತಿ ದಾಖಲೆಗಳು', ur: 'حاضری کا ریکارڈ' },
    'Academics & Timetable': { hi: 'शैक्षणिक एवं समय सारणी', mr: 'शैक्षणिक आणि वेळापत्रक', kn: 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವೇಳಾಪಟ್ಟಿ', ur: 'تعلیمی و ٹائم ٹیبل' },
    'Exams & Results': { hi: 'परीक्षा एवं परिणाम', mr: 'परीक्षा आणि निकाल', kn: 'ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಫಲಿತಾಂಶಗಳು', ur: 'امتحانات اور نتائج' },
    'Fees & Finance': { hi: 'फीस एवं वित्त', mr: 'फी आणि वित्त', kn: 'ಶುಲ್ಕ ಮತ್ತು ಹಣಕಾಸು', ur: 'فیس اور مالیات' },
    'Communication': { hi: 'संचार एवं सूचनाएं', mr: 'संवाद आणि सूचना', kn: 'ಸಂವಹನ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು', ur: 'مواصلات اور اعلانات' },
    'Transport Log': { hi: 'परिवहन लॉग', mr: 'वाहतूक नोंदी', kn: 'ಸಾರಿಗೆ ದಾಖಲೆ', ur: 'ٹرانسپورٹ لاگ' },
    'Hostel System': { hi: 'छात्रावास प्रणाली', mr: 'वसतिगृह प्रणाली', kn: 'ವಸತಿ ನಿಲಯ ವ್ಯವಸ್ಥೆ', ur: 'ہاسٹل سسٹم' },
    'Academic Calendar': { hi: 'शैक्षणिक कैलेंडर', mr: 'शैक्षणिक दिनदर्शिका', kn: 'ಶೈಕ್ಷಣಿಕ ಕ್ಯಾಲೆಂಡರ್', ur: 'تعلیمی کیلنڈر' },
    'Reports Generator': { hi: 'रिपोर्ट जनरेटर', mr: 'अहवाल जनरेटर', kn: 'ವರದಿಗಳ ತಯಾರಿಕೆ', ur: 'رپورٹس جنریٹر' },
    'System Settings': { hi: 'सिस्टम सेटिंग्स', mr: 'सिस्टीम सेटिंग्ज', kn: 'ಸಿಸ್ಟಮ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು', ur: 'سسٹم کی ترتیبات' },

    // --- Header & Global Actions ---
    'School ERP': { hi: 'स्कूल ईआरपी', mr: 'शाळा ईआरपी', kn: 'ಶಾಲೆ ಇಆರ್‌ಪಿ', ur: 'اسکول ای آر پی' },
    'SchoolERP': { hi: 'स्कूल ईआरपी', mr: 'शाळा ईआरपी', kn: 'ಶಾಲೆ ಇಆರ್‌ಪಿ', ur: 'اسکول ای آر پی' },
    'Toggle Theme': { hi: 'थीम बदलें', mr: 'थीम बदला', kn: 'ಥೀಮ್ ಬದಲಾಯಿಸಿ', ur: 'تھیم تبدیل کریں' },
    'Sign Out': { hi: 'साइन आउट', mr: 'साइन आउट करा', kn: 'ಸೈನ್ ಔಟ್', ur: 'سائن آؤٹ' },
    'Select Language': { hi: 'भाषा चुनें', mr: 'भाषा निवडा', kn: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', ur: 'زبان منتخب کریں' },

    // --- User Roles & Display Names in Sidebar ---
    'System Administrator': { hi: 'सिस्टम व्यवस्थापक', mr: 'सिस्टीम प्रशासक', kn: 'ಸಿಸ್ಟಮ್ ನಿರ್ವಾಹಕ', ur: 'سسٹم ایڈمنسٹریٹر' },
    'ADMINISTRATOR': { hi: 'व्यवस्थापक', mr: 'प्रशासक', kn: 'ನಿರ್ವಾಹಕ', ur: 'ایڈمن' },
    'ADMIN': { hi: 'व्यवस्थापक', mr: 'प्रशासक', kn: 'ನಿರ್ವಾಹಕ', ur: 'ایڈمن' },
    // --- Dashboard Stat Cards & Main Page Headings ---
    'Total Students': { hi: 'कुल विद्यार्थी', mr: 'एकूण विद्यार्थी', kn: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು', ur: 'کل طلباء' },
    'TOTAL STUDENTS': { hi: 'कुल विद्यार्थी', mr: 'एकूण विद्यार्थी', kn: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು', ur: 'کل طلباء' },
    'Enrolled in Active Batches': { hi: 'सक्रिय बैचों में नामांकित', mr: 'सक्रिय बॅचेसमध्ये नोंदणीकृत', kn: 'ಸಕ್ರಿಯ ಬ್ಯಾಚ್‌ಗಳಲ್ಲಿ ದಾಖಲಾಗಿದ್ದಾರೆ', ur: 'فعال بیچوں میں داخل شدہ' },
    'Total Teachers': { hi: 'कुल शिक्षक', mr: 'एकूण शिक्षक', kn: 'ಒಟ್ಟು ಶಿಕ್ಷಕರು', ur: 'کل اساتذہ' },
    'TOTAL TEACHERS': { hi: 'कुल शिक्षक', mr: 'एकूण शिक्षक', kn: 'ಒಟ್ಟು ಶಿಕ್ಷಕರು', ur: 'کل اساتذہ' },
    'Faculty & Advisory Staff': { hi: 'संकाय एवं सलाहकार कर्मचारी', mr: 'प्राध्यापक आणि सल्लागार कर्मचारी', kn: 'ಬೋಧಕ ಮತ್ತು ಸಲಹಾ ಸಿಬ್ಬಂದಿ', ur: 'اساتذہ اور مشاورتی عملہ' },
    'Daily Attendance': { hi: 'दैनिक उपस्थिति', mr: 'दैनिक उपस्थिती', kn: 'ದೈನಂದಿನ ಹಾಜರಾತಿ', ur: 'روزانہ حاضری' },
    'DAILY ATTENDANCE': { hi: 'दैनिक उपस्थिति', mr: 'दैनिक उपस्थिती', kn: 'ದೈನಂದಿನ ಹಾಜರಾತಿ', ur: 'روزانہ حاضری' },
    "Today's Present Rate": { hi: 'आज की उपस्थिति दर', mr: 'आजचा उपस्थिती दर', kn: 'ಇಂದಿನ ಹಾಜರಾತಿ ದರ', ur: 'آج کی حاضری کی شرح' },
    'Admissions (Enquiries)': { hi: 'प्रवेश (पूछताछ)', mr: 'प्रवेश (चौकशी)', kn: 'ಪ್ರವೇಶಗಳು (ವಿಚಾರಣೆಗಳು)', ur: 'داخلے (معلومات)' },
    'ADMISSIONS (ENQUIRIES)': { hi: 'प्रवेश (पूछताछ)', mr: 'प्रवेश (चौकशी)', kn: 'ಪ್ರವೇಶಗಳು (ವಿಚಾರಣೆಗಳು)', ur: 'داخلے (معلومات)' },
    'New Registrations This Month': { hi: 'इस महीने नए पंजीकरण', mr: 'या महिन्यात नवीन नोंदणी', kn: 'ಈ ತಿಂಗಳ ಹೊಸ ನೋಂದಣಿಗಳು', ur: 'اس ماہ کی نئی رجسٹریشن' },
    'Administrative Metrics Overview': { hi: 'प्रशासनिक मेट्रिक्स अवलोकन', mr: 'प्रशासकीय मेट्रिक्स विहंगावलोकन', kn: 'ಆಡಳಿತಾತ್ಮಕ ಮಾಪನಗಳ ಅವಲೋಕನ', ur: 'انتظامی جائزہ و میٹرکس' },
    'Refresh Data': { hi: 'डेटा रीफ़्रेश करें', mr: 'माहिती रिफ्रेश करा', kn: 'ಡೇಟಾ ರಿಫ್ರೆಶ್ ಮಾಡಿ', ur: 'ڈیٹا تازہ کریں' },
    'Fee Collection Summary': { hi: 'फीस संग्रह सारांश', mr: 'फी संकलन सारांश', kn: 'ಶುಲ್ಕ ಸಂಗ್ರಹ ಸಾರಾಂಶ', ur: 'فیس وصولی کا خلاصہ' },
    'Monthly Admission Trends': { hi: 'मासिक प्रवेश रुझान', mr: 'मासिक प्रवेश ट्रेंड', kn: 'ಮಾಸಿಕ ಪ್ರವೇಶ ಪ್ರವೃತ್ತಿ', ur: 'ماہانہ داخلوں کے رجحانات' },
    'Recent Admissions': { hi: 'हाल के प्रवेश', mr: 'अलीकडील प्रवेश', kn: 'ಇತ್ತೀಚಿನ ಪ್ರವೇಶಗಳು', ur: 'حالیہ داخلے' },
    'Collections (₹)': { hi: 'संग्रह (₹)', mr: 'संकलन (₹)', kn: 'ಸಂಗ್ರಹ (₹)', ur: 'وصولی (₹)' },
    'Admissions': { hi: 'प्रवेश', mr: 'प्रवेश', kn: 'ಪ್ರವೇಶಗಳು', ur: 'داخلے' },

    // --- Main Card Headings across all Modules ---
    'Support & Office Staff Directory': { hi: 'सहायक एवं कार्यालय कर्मचारी निर्देशिका', mr: 'सहाय्यक आणि कार्यालयीन कर्मचारी निर्देशिका', kn: 'ಬೆಂಬಲ ಮತ್ತು ಕಚೇರಿ ಸಿಬ್ಬಂದಿ ಕೋಶ', ur: 'سپورٹ اور دفتری عملے کی ڈائرکٹری' },
    'Teacher Faculty Ledger': { hi: 'शिक्षक संकाय सूची', mr: 'शिक्षक प्राध्यापक सूची', kn: 'ಶಿಕ್ಷಕರ ಬೋಧಕವರ್ಗ ಲೆಡ್ಜರ್', ur: 'اساتذہ فیکلٹی رجسٹر' },
    'Teacher Faculty List': { hi: 'शिक्षक संकाय सूची', mr: 'शिक्षक प्राध्यापक यादी', kn: 'ಶಿಕ್ಷಕರ ಬೋಧಕವರ್ಗ ಪಟ್ಟಿ', ur: 'اساتذہ فیکلٹی کی فہرست' },
    'Student Directory': { hi: 'विद्यार्थी निर्देशिका', mr: 'विद्यार्थी निर्देशिका', kn: 'ವಿದ್ಯಾರ್ಥಿ ಕೋಶ', ur: 'طلباء کی ڈائرکٹری' },
    'Admissions & Enquiries Ledger': { hi: 'प्रवेश एवं पूछताछ बहीखाता', mr: 'प्रवेश आणि चौकशी खातेवही', kn: 'ಪ್ರವೇಶಗಳು ಮತ್ತು ವಿಚಾರಣೆಗಳ ಲೆಡ್ಜರ್', ur: 'داخلے اور معلومات کا رجسٹر' },
    'Admissions Report': { hi: 'प्रवेश रिपोर्ट', mr: 'प्रवेश अहवाल', kn: 'ಪ್ರವೇಶಗಳ ವರದಿ', ur: 'داخلوں کی رپورٹ' },
    'Daily Student Attendance Registry': { hi: 'दैनिक विद्यार्थी उपस्थिति रजिस्टर', mr: 'दैनिक विद्यार्थी उपस्थिती नोंदवही', kn: 'ದೈನಂದಿನ ವಿದ್ಯಾರ್ಥಿ ಹಾಜರಾತಿ ನೋಂದಣಿ', ur: 'طلباء کی روزانہ حاضری کا رجسٹر' },
    'Attendance Summary': { hi: 'उपस्थिति सारांश', mr: 'उपस्थिती सारांश', kn: 'ಹಾಜರಾತಿ ಸಾರಾಂಶ', ur: 'حاضری کا خلاصہ' },
    'Financial Fee Ledger': { hi: 'वित्तीय फीस बहीखाता', mr: 'वित्तीय फी खातेवही', kn: 'ಹಣಕಾಸು ಶುಲ್ಕ ಲೆಡ್ಜರ್', ur: 'فنانشل فیس لیجر' },
    'Staff & Faculty Registry': { hi: 'कर्मचारी एवं शिक्षक रजिस्ट्री', mr: 'कर्मचारी आणि शिक्षक नोंदवही', kn: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಬೋಧಕರ ನೋಂದಣಿ', ur: 'عملہ اور اساتذہ رجسٹر' },
    'Weekly Timetable Schedule': { hi: 'साप्ताहिक समय सारणी', mr: 'साप्ताहिक वेळापत्रक', kn: 'ಸಾಪ್ತಾಹಿಕ ವೇಳಾಪಟ್ಟಿ', ur: 'ہفتہ وار ٹائم ٹیبل' },
    'Circulars & Announcements Bulletin': { hi: 'परिपत्रक एवं घोषणा बुलेटिन', mr: 'परिपत्रके आणि घोषणा बुलेटिन', kn: 'ಸುತ್ತೋಲೆಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳ ಬುಲೆಟಿನ್', ur: 'سرکلر اور اعلانات بلیٹن' },
    'Vehicles & Drivers Log': { hi: 'वाहन एवं चालक लॉग', mr: 'वाहने आणि चालक नोंद', kn: 'ವಾಹನಗಳು ಮತ್ತು ಚಾಲಕರ ದಾಖಲೆ', ur: 'گاڑیاں اور ڈرائیور لاگ' },
    'Route Mappings': { hi: 'मार्ग निर्धारण', mr: 'मार्ग नियोजन', kn: 'ಮಾರ್ಗ ಮ್ಯಾಪಿಂಗ್‌ಗಳು', ur: 'روٹ میپنگ' },
    'Student Fee Payments': { hi: 'विद्यार्थी फीस भुगतान', mr: 'विद्यार्थी फी देयके', kn: 'ವಿದ್ಯಾರ್ಥಿ ಶುಲ್ಕ ಪಾವತಿಗಳು', ur: 'طلباء کی فیس ادائیگیاں' },
    'Fee Categories': { hi: 'फीस श्रेणियां', mr: 'फी प्रकार / वर्ग', kn: 'ಶುಲ್ಕ ವರ್ಗಗಳು', ur: 'فیس کی اقسام' },
    'Hostels': { hi: 'छात्रावास', mr: 'वसतिगृहे', kn: 'ವಸತಿ ನಿಲಯಗಳು', ur: 'ہاسٹل' },
    'Room Allocations': { hi: 'कमरा आवंटन', mr: 'खोली वाटप', kn: 'ಕೊಠಡಿ ಹಂಚಿಕೆಗಳು', ur: 'کمروں کی الاٹمنٹ' },
    'Visitor Security Register': { hi: 'आगंतुक सुरक्षा रजिस्टर', mr: 'अभ्यागत सुरक्षा नोंदवही', kn: 'ಸಂದರ್ಶಕರ ಭದ್ರತಾ ನೋಂದಣಿ', ur: 'وزیٹر سیکیورٹی رجسٹر' },
    'Reports Menu': { hi: 'रिपोर्ट मेनू', mr: 'अहवाल मेनू', kn: 'ವರದಿಗಳ ಮೆನು', ur: 'رپورٹس مینو' },
    'Report Preview': { hi: 'रिपोर्ट पूर्वावलोकन', mr: 'अहवाल पूर्वावलोकन', kn: 'ವರದಿ ಮುನ್ನೋಟ', ur: 'رپورٹ کا پیش نظارہ' },
    'Setup Core': { hi: 'मूल सेटअप', mr: 'मूळ सेटअप', kn: 'ಮೂಲ ಸೆಟಪ್', ur: 'بنیادی سیٹ اپ' },
    'Classes': { hi: 'कक्षाएं', mr: 'इयत्ता', kn: 'ತರಗತಿಗಳು', ur: 'کلاسیں' },
    'Sections': { hi: 'अनुभाग', mr: 'तुकड्या', kn: 'ವಿಭಾಗಗಳು', ur: 'سیکشنز' },
    'Subjects': { hi: 'विषय', mr: 'विषय', kn: 'ವಿಷಯಗಳು', ur: 'مضامین' },
    'Active Exams': { hi: 'सक्रिय परीक्षाएं', mr: 'सक्रिय परीक्षा', kn: 'ಸಕ್ರಿಯ ಪರೀಕ್ಷೆಗಳು', ur: 'فعال امتحانات' },
    'Examination Results Entry': { hi: 'परीक्षा परिणाम प्रविष्टि', mr: 'परीक्षा निकाल नोंदणी', kn: 'ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳ ನಮೂದು', ur: 'امتحانی نتائج کا اندراج' },

    // --- Buttons & Actions ---
    'Add Staff Member': { hi: 'कर्मचारी जोड़ें', mr: 'कर्मचारी जोडा', kn: 'ಸಿಬ್ಬಂದಿ ಸೇರಿಸಿ', ur: 'عملہ شامل کریں' },
    'Add New Staff': { hi: 'नया कर्मचारी जोड़ें', mr: 'नवीन कर्मचारी जोडा', kn: 'ಹೊಸ ಸಿಬ್ಬಂದಿ ಸೇರಿಸಿ', ur: 'نیا عملہ شامل کریں' },
    'Add New Teacher': { hi: 'नया शिक्षक जोड़ें', mr: 'नवीन शिक्षक जोडा', kn: 'ಹೊಸ ಶಿಕ್ಷಕರನ್ನು ಸೇರಿಸಿ', ur: 'نیا استاد شامل کریں' },
    'Add New Student': { hi: 'नया विद्यार्थी जोड़ें', mr: 'नवीन विद्यार्थी जोडा', kn: 'ಹೊಸ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಸೇರಿಸಿ', ur: 'نیا طالب علم شامل کریں' },
    'Register New Enquiry': { hi: 'नई पूछताछ पंजीकृत करें', mr: 'नवीन चौकशी नोंदवा', kn: 'ಹೊಸ ವಿಚಾರಣೆಯನ್ನು ನೋಂದಾಯಿಸಿ', ur: 'نئی معلومات درج کریں' },
    'Post New Notice': { hi: 'नई सूचना पोस्ट करें', mr: 'नवीन सूचना प्रसिद्ध करा', kn: 'ಹೊಸ ಪ್ರಕಟಣೆ ಪ್ರಕಟಿಸಿ', ur: 'نیا نوٹس لگائیں' },
    'Publish New Notice': { hi: 'नई सूचना प्रकाशित करें', mr: 'नवीन सूचना प्रसिद्ध करा', kn: 'ಹೊಸ ಪ್ರಕಟಣೆಯನ್ನು ಪ್ರಕಟಿಸಿ', ur: 'نیا نوٹس شائع کریں' },
    'Publish Notice': { hi: 'सूचना प्रकाशित करें', mr: 'सूचना प्रसिद्ध करा', kn: 'ಪ್ರಕಟಣೆ ಪ್ರಕಟಿಸಿ', ur: 'نوٹس شائع کریں' },
    'Add Vehicle': { hi: 'वाहन जोड़ें', mr: 'वाहन जोडा', kn: 'ವಾಹನ ಸೇರಿಸಿ', ur: 'گاڑی شامل کریں' },
    'Create Route': { hi: 'मार्ग बनाएं', mr: 'मार्ग तयार करा', kn: 'ಮಾರ್ಗ ರಚಿಸಿ', ur: 'روٹ بنائیں' },
    'Add Route': { hi: 'मार्ग जोड़ें', mr: 'मार्ग जोडा', kn: 'ಮಾರ್ಗ ಸೇರಿಸಿ', ur: 'روٹ شامل کریں' },
    'Record Payment': { hi: 'भुगतान दर्ज करें', mr: 'देयक नोंदवा', kn: 'ಪಾವತಿ ದಾಖಲಿಸಿ', ur: 'ادائیگی درج کریں' },
    'Record Fee Payment': { hi: 'फीस भुगतान दर्ज करें', mr: 'फी देयक नोंदवा', kn: 'ಶುಲ್ಕ ಪಾವತಿ ದಾಖಲಿಸಿ', ur: 'فیس ادائیگی درج کریں' },
    'Add Fee Category': { hi: 'फीस श्रेणी जोड़ें', mr: 'फी प्रकार जोडा', kn: 'ಶುಲ್ಕ ವರ್ಗ ಸೇರಿಸಿ', ur: 'فیس کی قسم شامل کریں' },
    'Add Category': { hi: 'श्रेणी जोड़ें', mr: 'वर्ग जोडा', kn: 'ವರ್ಗ ಸೇರಿಸಿ', ur: 'قسم شامل کریں' },
    'Add Room': { hi: 'कमरा जोड़ें', mr: 'खोली जोडा', kn: 'ಕೊಠಡಿ ಸೇರಿಸಿ', ur: 'کمرہ شامل کریں' },
    'Allocate Room': { hi: 'कमरा आवंटित करें', mr: 'खोली वाटप करा', kn: 'ಕೊಠಡಿ ಹಂಚಿಕೆ ಮಾಡಿ', ur: 'کمرہ الاٹ کریں' },
    'Add Hostel': { hi: 'छात्रावास जोड़ें', mr: 'वसतिगृह जोडा', kn: 'ವಸತಿ ನಿಲಯ ಸೇರಿಸಿ', ur: 'ہاسٹل شامل کریں' },
    'Log Visitor': { hi: 'आगंतुक दर्ज करें', mr: 'अभ्यागत नोंदवा', kn: 'ಸಂದರ್ಶಕರನ್ನು ದಾಖಲಿಸಿ', ur: 'وزیٹر لاگ کریں' },
    'Add Event': { hi: 'कार्यक्रम जोड़ें', mr: 'कार्यक्रम जोडा', kn: 'ಕಾರ್ಯಕ್ರಮ ಸೇರಿಸಿ', ur: 'ایونٹ شامل کریں' },
    'Add Calendar Event': { hi: 'कैलेंडर कार्यक्रम जोड़ें', mr: 'दिनदर्शिका कार्यक्रम जोडा', kn: 'ಕ್ಯಾಲೆಂಡರ್ ಕಾರ್ಯಕ್ರಮ ಸೇರಿಸಿ', ur: 'کیلنڈر ایونٹ شامل کریں' },
    'Load Class': { hi: 'कक्षा लोड करें', mr: 'इयत्ता लोड करा', kn: 'ತರಗತಿ ಲೋಡ್ ಮಾಡಿ', ur: 'کلاس لوڈ کریں' },
    'Load Registry': { hi: 'रजिस्ट्री लोड करें', mr: 'नोंदवही लोड करा', kn: 'ರಿಜಿಸ್ಟ್ರಿ ಲೋಡ್ ಮಾಡಿ', ur: 'رجسٹری لوڈ کریں' },
    'Load': { hi: 'लोड करें', mr: 'लोड करा', kn: 'ಲೋಡ್ ಮಾಡಿ', ur: 'لوڈ کریں' },
    'Fetch Roll': { hi: 'रोल सूची लाएं', mr: 'हजेरी यादी आणा', kn: 'ರೋಲ್ ಪಟ್ಟಿ ತನ್ನಿ', ur: 'حاضری لائیں' },
    'Save Attendance Log': { hi: 'उपस्थिति लॉग सहेजें', mr: 'उपस्थिती नोंद जतन करा', kn: 'ಹಾಜರಾತಿ ದಾಖಲೆ ಉಳಿಸಿ', ur: 'حاضری لاگ محفوظ کریں' },
    'Save Attendance': { hi: 'उपस्थिति सहेजें', mr: 'उपस्थिती जतन करा', kn: 'ಹಾಜರಾತಿ ಉಳಿಸಿ', ur: 'حاضری محفوظ کریں' },
    'Save Marks Sheet': { hi: 'अंक तालिका सहेजें', mr: 'गुण पत्रिका जतन करा', kn: 'ಅಂಕಪಟ್ಟಿ ಉಳಿಸಿ', ur: 'مارکس شیٹ محفوظ کریں' },
    'Print / Export PDF': { hi: 'प्रिंट / पीडीएफ निर्यात करें', mr: 'प्रिंट / PDF एक्सपोर्ट करा', kn: 'ಮುದ್ರಿಸಿ / PDF ರಫ್ತು ಮಾಡಿ', ur: 'پرنٹ / پی ڈی ایف برآمد کریں' },
    'Print Report': { hi: 'रिपोर्ट प्रिंट करें', mr: 'अहवाल मुद्रित करा', kn: 'ವರದಿ ಮುದ್ರಿಸಿ', ur: 'رپورٹ پرنٹ کریں' },
    'Generate Report': { hi: 'रिपोर्ट तैयार करें', mr: 'अहवाल तयार करा', kn: 'ವರದಿ ತಯಾರಿಸಿ', ur: 'رپورٹ بنائیں' },
    'Manage Classes': { hi: 'कक्षाएं प्रबंधित करें', mr: 'इयत्ता व्यवस्थापित करा', kn: 'ತರಗತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ', ur: 'کلاسوں کا انتظام' },
    'Manage Sections': { hi: 'अनुभाग प्रबंधित करें', mr: 'तुकड्या व्यवस्थापित करा', kn: 'ವಿಭಾಗಗಳನ್ನು ನಿರ್ವಹಿಸಿ', ur: 'سیکشنوں کا انتظام' },
    'Manage Subjects': { hi: 'विषय प्रबंधित करें', mr: 'विषय व्यवस्थापित करा', kn: 'ವಿಷಯಗಳನ್ನು ನಿರ್ವಹಿಸಿ', ur: 'مضامین کا انتظام' },
    'Add Entry': { hi: 'प्रविष्टि जोड़ें', mr: 'नोंद जोडा', kn: 'ನಮೂದು ಸೇರಿಸಿ', ur: 'اندراج شامل کریں' },
    'Add Timetable Entry': { hi: 'समय सारणी प्रविष्टि जोड़ें', mr: 'वेळापत्रक नोंद जोडा', kn: 'ವೇಳಾಪಟ್ಟಿ ನಮೂದು ಸೇರಿಸಿ', ur: 'ٹائم ٹیبل کا اندراج شامل کریں' },
    'Add New Exam': { hi: 'नई परीक्षा जोड़ें', mr: 'नवीन परीक्षा जोडा', kn: 'ಹೊಸ ಪರೀಕ್ಷೆ ಸೇರಿಸಿ', ur: 'نیا امتحان شامل کریں' },
    'Create Exam': { hi: 'परीक्षा बनाएं', mr: 'परीक्षा तयार करा', kn: 'ಪರೀಕ್ಷೆ ರಚಿಸಿ', ur: 'امتحان بنائیں' },
    'Create Instant Backup': { hi: 'तत्काल बैकअप बनाएं', mr: 'त्वरित बॅकअप तयार करा', kn: 'ತ್ವರಿತ ಬ್ಯಾಕಪ್ ರಚಿಸಿ', ur: 'فوری بیک اپ بنائیں' },
    'Restore from Backup': { hi: 'बैकअप से पुनर्स्थापित करें', mr: 'बॅकअपमधून पुनर्संचयित करा', kn: 'ಬ್ಯಾಕಪ್‌ನಿಂದ ಮರುಸ್ಥಾಪಿಸಿ', ur: 'بیک اپ سے بحال کریں' },
    'Update Credentials': { hi: 'क्रेडेंशियल्स अपडेट करें', mr: 'क्रेडेंशियल्स अपडेट करा', kn: 'ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ', ur: 'تفصیلات اپ ڈیٹ کریں' },
    'Save Profile': { hi: 'प्रोफ़ाइल सहेजें', mr: 'प्रोफाइल जतन करा', kn: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ', ur: 'پروفائل محفوظ کریں' },
    'Save Student': { hi: 'विद्यार्थी सहेजें', mr: 'विद्यार्थी जतन करा', kn: 'ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಉಳಿಸಿ', ur: 'طالب علم محفوظ کریں' },
    'Save': { hi: 'सहेजें', mr: 'जतन करा', kn: 'ಉಳಿಸಿ', ur: 'محفوظ کریں' },
    'Save Changes': { hi: 'परिवर्तन सहेजें', mr: 'बदल जतन करा', kn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ', ur: 'تبدیلیاں محفوظ کریں' },
    'Cancel': { hi: 'रद्द करें', mr: 'रद्द करा', kn: 'ರದ್ದುಮಾಡಿ', ur: 'منسوخ کریں' },
    'Delete': { hi: 'हटाएं', mr: 'हटवा', kn: 'ಅಳಿಸಿ', ur: 'حذف کریں' },
    'Edit': { hi: 'संपादित करें', mr: 'संपादित करा', kn: 'ಸಂಪಾದಿಸಿ', ur: 'ترمیم کریں' },
    'Search': { hi: 'खोजें', mr: 'शोधा', kn: 'ಹುಡುಕಿ', ur: 'تلاش کریں' },
    'Filter': { hi: 'फ़िल्टर', mr: 'फिल्टर', kn: 'ಫಿಲ್ಟರ್', ur: 'فلٹر' },
    'Export': { hi: 'निर्यात करें', mr: 'एक्सपोर्ट करा', kn: 'ರಫ್ತು ಮಾಡಿ', ur: 'برآمد کریں' },
    'Export CSV': { hi: 'सीएसवी निर्यात करें', mr: 'CSV एक्सपोर्ट करा', kn: 'CSV ರಫ್ತು ಮಾಡಿ', ur: 'سی ایس وی برآمد کریں' },
    'Print': { hi: 'प्रिंट करें', mr: 'मुद्रित करा', kn: 'ಮುದ್ರಿಸಿ', ur: 'پرنٹ کریں' },
    'Refresh': { hi: 'रीफ़्रेश करें', mr: 'रिफ्रेश करा', kn: 'ರಿಫ್ರೆಶ್ ಮಾಡಿ', ur: 'تازہ کریں' },
    'Submit': { hi: 'जमा करें', mr: 'सबमिट करा', kn: 'ಸಲ್ಲಿಸಿ', ur: 'جمع کریں' },
    'Confirm': { hi: 'पुष्टि करें', mr: 'पुष्टी करा', kn: 'ದೃಢೀಕರಿಸಿ', ur: 'تصدیق کریں' },
    'Confirm Action': { hi: 'कार्रवाई की पुष्टि करें', mr: 'कृतीची पुष्टी करा', kn: 'ಕ್ರಮವನ್ನು ದೃಢೀಕರಿಸಿ', ur: 'عمل کی تصدیق کریں' },
    'Close': { hi: 'बंद करें', mr: 'बंद करा', kn: 'ಮುಚ್ಚಿ', ur: 'بند کریں' },
    'View': { hi: 'देखें', mr: 'पहा', kn: 'ನೋಡಿ', ur: 'دیکھیں' },
    'Download': { hi: 'डाउनलोड करें', mr: 'डाउनलोड करा', kn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', ur: 'ڈاؤن لوڈ کریں' },
    'Clear': { hi: 'साफ़ करें', mr: 'साफ करा', kn: 'ತೆರವುಗೊಳಿಸಿ', ur: 'صاف کریں' },
    'Reset': { hi: 'रीसेट करें', mr: 'रीसेट करा', kn: 'ಮರುಹೊಂದಿಸಿ', ur: 'دوبارہ ترتیب دیں' },
    'Prev': { hi: 'पिछला', mr: 'मागील', kn: 'ಹಿಂದಿನ', ur: 'پچھلا' },
    'Next': { hi: 'अगला', mr: 'पुढील', kn: 'ಮುಂದಿನ', ur: 'اگلا' },
    'Actions': { hi: 'क्रियाएं', mr: 'कृती', kn: 'ಕ್ರಿಯೆಗಳು', ur: 'اقدامات' },
    'Status': { hi: 'स्थिति', mr: 'स्थिती', kn: 'ಸ್ಥಿತಿ', ur: 'حیثیت' },

    // --- Table Headers & Columns ---
    'Contact No': { hi: 'संपर्क नंबर', mr: 'संपर्क क्रमांक', kn: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ', ur: 'رابطہ نمبر' },
    'CONTACT NO': { hi: 'संपर्क नंबर', mr: 'संपर्क क्रमांक', kn: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ', ur: 'رابطہ نمبر' },
    'Contact No.': { hi: 'संपर्क नंबर', mr: 'संपर्क क्रमांक', kn: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ', ur: 'ರابطہ نمبر' },
    'Contact Phone': { hi: 'संपर्क फोन', mr: 'संपर्क फोन', kn: 'ಸಂಪರ್ಕ ದೂರವಾಣಿ', ur: 'رابطہ فون' },
    'Contact': { hi: 'संपर्क', mr: 'संपर्क', kn: 'ಸಂಪರ್ಕ', ur: 'رابطہ' },
    'Employee ID': { hi: 'कर्मचारी आईडी', mr: 'कर्मचारी आयडी', kn: 'ಉದ್ಯೋಗಿ ಐಡಿ', ur: 'ملازم شناختی نمبر' },
    'Full Name': { hi: 'पूरा नाम', mr: 'पूर्ण नाव', kn: 'ಪೂರ್ಣ ಹೆಸರು', ur: 'پورا نام' },
    'Role': { hi: 'भूमिका / पद', mr: 'भूमिका / पद', kn: 'ಪಾತ್ರ / ಹುದ್ದೆ', ur: 'کردار / عہدہ' },
    'Department': { hi: 'विभाग', mr: 'विभाग', kn: 'ವಿಭಾಗ / ಇಲಾಖೆ', ur: 'شعبہ' },
    'Qualification': { hi: 'योग्यता', mr: 'पात्रता / शिक्षण', kn: 'ವಿದ್ಯಾರ್ಹತೆ', ur: 'تعلیمی قابلیت' },
    'Joining Date': { hi: 'शामिल होने की तिथि', mr: 'रूजू झाल्याची तारीख', kn: 'ಸೇರ್ಪಡೆ ದಿನಾಂಕ', ur: 'شمولیت کی تاریخ' },
    'Student ID': { hi: 'विद्यार्थी आईडी', mr: 'विद्यार्थी आयडी', kn: 'ವಿದ್ಯಾರ್ಥಿ ಐಡಿ', ur: 'طالب علم شناختی نمبر' },
    'Roll Number': { hi: 'अनुक्रमांक (रोल नंबर)', mr: 'हजेरी क्रमांक (रोल नंबर)', kn: 'ರೋಲ್ ಸಂಖ್ಯೆ', ur: 'رول نمبر' },
    'Roll No.': { hi: 'अनुक्रमांक', mr: 'हजेरी क्र.', kn: 'ರೋಲ್ ಸಂಖ್ಯೆ', ur: 'رول نمبر' },
    'Roll No': { hi: 'अनुक्रमांक', mr: 'हजेरी क्र.', kn: 'ರೋಲ್ ಸಂಖ್ಯೆ', ur: 'رول نمبر' },
    'Student Name': { hi: 'विद्यार्थी का नाम', mr: 'विद्यार्थ्याचे नाव', kn: 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು', ur: 'طالب علم کا نام' },
    'Candidate Name': { hi: 'उम्मीदवार का नाम', mr: 'उमेदवाराचे नाव', kn: 'ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು', ur: 'امیدوار کا نام' },
    'Candidate Name *': { hi: 'उम्मीदवार का नाम *', mr: 'उमेदवाराचे नाव *', kn: 'ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು *', ur: 'امیدوار کا نام *' },
    'Parent Name': { hi: 'अभिभावक का नाम', mr: 'पालकांचे नाव', kn: 'ಪೋಷಕರ ಹೆಸರು', ur: 'سرپرست کا نام' },
    'Parent / Guardian': { hi: 'अभिभावक', mr: 'पालक', kn: 'ಪೋಷಕರು', ur: 'سرپرست' },
    'Parent Phone': { hi: 'अभिभावक का फोन', mr: 'पालकांचा फोन', kn: 'ಪೋಷಕರ ದೂರವಾಣಿ', ur: 'سرپرست کا فون' },
    'Class / Section': { hi: 'कक्षा / अनुभाग', mr: 'इयत्ता / तुकडी', kn: 'ತರಗತಿ / ವಿಭಾಗ', ur: 'کلاس / سیکشن' },
    'Class Requested': { hi: 'वांछित कक्षा', mr: 'मागितलेली इयत्ता', kn: 'ವಿನಂತಿಸಿದ ತರಗತಿ', ur: 'مطلوبہ کلاس' },
    'Enquiry Date': { hi: 'पूछताछ तिथि', mr: 'चौकशी तारीख', kn: 'ವಿಚಾರಣೆ ದಿನಾಂಕ', ur: 'معلومات کی تاریخ' },
    'Publish Date': { hi: 'प्रकाशन तिथि', mr: 'प्रसिद्धी तारीख', kn: 'ಪ್ರಕಟಣಾ ದಿನಾಂಕ', ur: 'اشاعت کی تاریخ' },
    'Notice Title': { hi: 'सूचना का शीर्षक', mr: 'सूचनेचे शीर्षक', kn: 'ಪ್ರಕಟಣೆಯ ಶೀರ್ಷಿಕೆ', ur: 'نوٹس کا عنوان' },
    'Body Preview': { hi: 'संदेश झलक', mr: 'संदेश पूर्वावलोकन', kn: 'ವಿವರ ಮುನ್ನೋಟ', ur: 'پیغام کا خلاصہ' },
    'Audience': { hi: 'दर्शक / वर्ग', mr: 'प्रेक्षक / वर्ग', kn: 'ಪ್ರೇಕ್ಷಕರು', ur: 'مخاطبین' },
    'Receipt No.': { hi: 'रसीद संख्या', mr: 'पावती क्रमांक', kn: 'ರಶೀದಿ ಸಂಖ್ಯೆ', ur: 'رسید نمبر' },
    'Receipt No': { hi: 'रसीद संख्या', mr: 'पावती क्रमांक', kn: 'ರಶೀದಿ ಸಂಖ್ಯೆ', ur: 'رسید نمبر' },
    'Fee Type': { hi: 'फीस का प्रकार', mr: 'फी प्रकार', kn: 'ಶುಲ್ಕದ ಪ್ರಕಾರ', ur: 'فیس کی قسم' },
    'Amount (₹)': { hi: 'राशि (₹)', mr: 'रक्कम (₹)', kn: 'ಮೊತ್ತ (₹)', ur: 'رقم (₹)' },
    'Payment Date': { hi: 'भुगतान तिथि', mr: 'देयक तारीख', kn: 'ಪಾವತಿ ದಿನಾಂಕ', ur: 'ادائیگی کی تاریخ' },
    'Method': { hi: 'माध्यम', mr: 'पद्धत', kn: 'ವಿಧಾನ', ur: 'طریقہ' },
    'Reg No.': { hi: 'पंजीकरण संख्या', mr: 'नोंदणी क्रमांक', kn: 'ನೋಂದಣಿ ಸಂಖ್ಯೆ', ur: 'رجسٹریشن نمبر' },
    'Registration No': { hi: 'पंजीकरण संख्या', mr: 'नोंदणी क्रमांक', kn: 'ನೋಂದಣಿ ಸಂಖ್ಯೆ', ur: 'رجسٹریشن نمبر' },
    'Model': { hi: 'मॉडल', mr: 'मॉडेल', kn: 'ಮಾದರಿ', ur: 'ماڈل' },
    'Model / Type': { hi: 'मॉडल / प्रकार', mr: 'मॉडेल / प्रकार', kn: 'ಮಾದರಿ / ಪ್ರಕಾರ', ur: 'ماڈل / قسم' },
    'Capacity': { hi: 'क्षमता', mr: 'क्षमता', kn: 'ಸಾಮರ್ಥ್ಯ', ur: 'گنجائش' },
    'Driver': { hi: 'चालक', mr: 'चालक', kn: 'ಚಾಲಕ', ur: 'ڈرائیور' },
    'Driver Name': { hi: 'चालक का नाम', mr: 'चालकाचे नाव', kn: 'ಚಾಲಕನ ಹೆಸರು', ur: 'ڈرائیور کا نام' },
    'Driver Phone': { hi: 'चालक का फोन', mr: 'चालकाचा फोन', kn: 'ಚಾಲಕನ ದೂರವಾಣಿ', ur: 'ڈرائیور کا فون' },
    'Route Name': { hi: 'मार्ग का नाम', mr: 'मार्गाचे नाव', kn: 'ಮಾರ್ಗದ ಹೆಸರು', ur: 'روٹ کا نام' },
    'Origin / Destination': { hi: 'प्रारंभ / गंतव्य स्थान', mr: 'सुरुवात / गंतव्य स्थान', kn: 'ಆರಂಭ / ಗಮ್ಯಸ್ಥಾನ', ur: 'شروع / منزل' },
    'Vehicle': { hi: 'वाहन', mr: 'वाहन', kn: 'ವಾಹನ', ur: 'گاڑی' },
    'Room No.': { hi: 'कमरा सं.', mr: 'खोली क्र.', kn: 'ಕೊಠಡಿ ಸಂಖ್ಯೆ', ur: 'کمرہ نمبر' },
    'Room No': { hi: 'कमरा सं.', mr: 'खोली क्र.', kn: 'ಕೊಠಡಿ ಸಂಖ್ಯೆ', ur: 'کمرہ نمبر' },
    'Bed No': { hi: 'बिस्तर सं.', mr: 'बेड क्र.', kn: 'ಬೆಡ್ ಸಂಖ್ಯೆ', ur: 'بیڈ نمبر' },
    'Style': { hi: 'प्रकार / शैली', mr: 'प्रकार / रचना', kn: 'ಶೈಲಿ / ಮಾದರಿ', ur: 'انداز / قسم' },
    'Hostel': { hi: 'छात्रावास', mr: 'वसतिगृह', kn: 'ವಸತಿ ನಿಲಯ', ur: 'ہاسٹل' },
    'Hostel Name': { hi: 'छात्रावास का नाम', mr: 'वसतिगृहाचे नाव', kn: 'ವಸತಿ ನಿಲಯದ ಹೆಸರು', ur: 'ہاسٹل کا نام' },
    'Visitor Name': { hi: 'आगंतुक का नाम', mr: 'अभ्यागताचे नाव', kn: 'ಸಂದರ್ಶಕರ ಹೆಸರು', ur: 'وزیٹر کا نام' },
    'Purpose': { hi: 'उद्देश्य', mr: 'हेतू / कारण', kn: 'ಉದ್ದೇಶ', ur: 'مقصد' },
    'Host': { hi: 'मेजबान', mr: 'यजमान', kn: 'ಆತಿಥೇಯ', ur: 'میزبان' },
    'In': { hi: 'आगमन समय', mr: 'आगमन वेळ', kn: 'ಆಗಮನ ಸಮಯ', ur: 'داخل ہونے کا وقت' },
    'Out': { hi: 'प्रस्थान समय', mr: 'निर्गमन वेळ', kn: 'ನಿರ್ಗಮನ ಸಮಯ', ur: 'جانے کا وقت' },
    'Day': { hi: 'दिन', mr: 'दिवस', kn: 'ದಿನ', ur: 'دن' },
    'Time Block': { hi: 'समय अंतराल', mr: 'वेळ गट', kn: 'ಸಮಯದ ಬ್ಲಾಕ್', ur: 'وقت کا وقفہ' },
    'Instructor': { hi: 'शिक्षक / प्रशिक्षक', mr: 'शिक्षक / मार्गदर्शक', kn: 'ಬೋಧಕರು', ur: 'استاد' },
    'Subject': { hi: 'विषय', mr: 'विषय', kn: 'ವಿಷಯ', ur: 'مضمون' },
    'Max Marks': { hi: 'पूर्णांक (अधिकतम अंक)', mr: 'एकूण गुण', kn: 'ಗರಿಷ್ಠ ಅಂಕಗಳು', ur: 'کل نمبرات' },
    'Marks Obtained': { hi: 'प्राप्तांक', mr: 'मिळालेले गुण', kn: 'ಗಳಿಸಿದ ಅಂಕಗಳು', ur: 'حاصل کردہ نمبرات' },
    'Remarks': { hi: 'टिप्पणी', mr: 'शेरा / टिप्पणी', kn: 'ಷರಾ / ಟಿಪ್ಪಣಿ', ur: 'تبصرہ' },
    'Date': { hi: 'तिथि', mr: 'तारीख', kn: 'ದಿನಾಂಕ', ur: 'تاریخ' },
    'Action': { hi: 'क्रिया', mr: 'कृती', kn: 'ಕ್ರಿಯೆ', ur: 'عمل' },

    // --- Search Input Placeholders ---
    'Search by Employee ID, Name, Role…': { hi: 'कर्मचारी आईडी, नाम, पद से खोजें…', mr: 'कर्मचारी आयडी, नाव, भूमिकेद्वारे शोधा…', kn: 'ಉದ್ಯೋಗಿ ಐಡಿ, ಹೆಸರು, ಪಾತ್ರದಿಂದ ಹುಡುಕಿ…', ur: 'ملازم شناختی نمبر، نام یا عہدے سے تلاش کریں…' },
    'Search by Employee ID, Name, Department…': { hi: 'कर्मचारी आईडी, नाम, विभाग से खोजें…', mr: 'कर्मचारी आयडी, नाव, विभागाद्वारे शोधा…', kn: 'ಉದ್ಯೋಗಿ ಐಡಿ, ಹೆಸರು, ವಿಭಾಗದಿಂದ ಹುಡುಕಿ…', ur: 'ملازم شناختی نمبر، نام یا شعبے سے تلاش کریں…' },
    'Search by Candidate or Parent Name…': { hi: 'उम्मीदवार या अभिभावक के नाम से खोजें…', mr: 'उमेदवार किंवा पालकांच्या नावाने शोधा…', kn: 'ಅಭ್ಯರ್ಥಿ ಅಥವಾ ಪೋಷಕರ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ…', ur: 'امیدوار یا سرپرست کے نام سے تلاش کریں…' },
    'Search by Name, ID, or Parent…': { hi: 'नाम, आईडी या अभिभावक से खोजें…', mr: 'नाव, आयडी किंवा पालकांद्वारे शोधा…', kn: 'ಹೆಸರು, ಐಡಿ ಅಥವಾ ಪೋಷಕರಿಂದ ಹುಡುಕಿ…', ur: 'نام، شناختی نمبر یا سرپرست سے تلاش کریں…' },
    'Search by Student Name or ID…': { hi: 'विद्यार्थी नाम या आईडी से खोजें…', mr: 'विद्यार्थ्याचे नाव किंवा आयडीने शोधा…', kn: 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು ಅಥವಾ ಐಡಿಯಿಂದ ಹುಡುಕಿ…', ur: 'طالب علم کے نام یا شناختی نمبر سے تلاش کریں…' },
    'Enter username': { hi: 'यूज़रनेम दर्ज करें', mr: 'वापरकर्ता नाव प्रविष्ट करा', kn: 'ಬಳಕೆದಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ', ur: 'صارف کا نام درج کریں' },
    'Enter password': { hi: 'पासवर्ड दर्ज करें', mr: 'पासवर्ड प्रविष्ट करा', kn: 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ', ur: 'پاس ورڈ درج کریں' },

    // --- Select Filters & Form Labels ---
    'Status:': { hi: 'स्थिति:', mr: 'स्थिती:', kn: 'ಸ್ಥಿತಿ:', ur: 'حیثیت:' },
    'Date:': { hi: 'तिथि:', mr: 'तारीख:', kn: 'ದಿನಾಂಕ:', ur: 'تاریخ:' },
    'Class:': { hi: 'कक्षा:', mr: 'इयत्ता:', kn: 'ತರಗತಿ:', ur: 'کلاس:' },
    'Section:': { hi: 'अनुभाग:', mr: 'तुकडी:', kn: 'ವಿಭಾಗ:', ur: 'سیکشن:' },
    'All Classes': { hi: 'सभी कक्षाएं', mr: 'सर्व इयत्ता', kn: 'ಎಲ್ಲಾ ತರಗತಿಗಳು', ur: 'تمام کلاسیں' },
    'All Sections': { hi: 'सभी अनुभाग', mr: 'सर्व तुकड्या', kn: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು', ur: 'تمام سیکشنز' },
    'All Statuses': { hi: 'सभी स्थितियां', mr: 'सर्व स्थिती', kn: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು', ur: 'تمام کیفیات' },
    'All Status': { hi: 'सभी स्थितियां', mr: 'सर्व स्थिती', kn: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು', ur: 'تمام کیفیات' },
    'Active': { hi: 'सक्रिय', mr: 'सक्रिय', kn: 'ಸಕ್ರಿಯ', ur: 'فعال' },
    'Inactive': { hi: 'निष्क्रिय', mr: 'निष्क्रिय', kn: 'ನಿಷ್ಕ್ರಿಯ', ur: 'غیر فعال' },
    'Alumni': { hi: 'पूर्व छात्र', mr: 'माजी विद्यार्थी', kn: 'ಹಳೆಯ ವಿದ್ಯಾರ್ಥಿ', ur: 'سابق طلباء' },
    'Pending': { hi: 'लंबित', mr: 'प्रलंबित', kn: 'ಬಾಕಿ ಇದೆ', ur: 'زیر التواء' },
    'Follow-up': { hi: 'फॉलो-अप', mr: 'फॉलो-अप', kn: 'ಫಾಲೋ-ಅಪ್', ur: 'پیروی' },
    'Registered': { hi: 'पंजीकृत', mr: 'नोंदणीकृत', kn: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ', ur: 'رجسٹرڈ' },
    'Admitted': { hi: 'प्रवेशित', mr: 'प्रवेश दिला', kn: 'ದಾಖಲಿಸಲಾಗಿದೆ', ur: 'داخلہ مکمل' },
    'Rejected': { hi: 'अस्वीकृत', mr: 'नाकारले', kn: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ', ur: 'مسترد' },
    'Present': { hi: 'उपस्थित', mr: 'उपस्थित', kn: 'ಹಾಜರು', ur: 'حاضر' },
    'Absent': { hi: 'अनुपस्थित', mr: 'अनुपस्थित', kn: 'ಗೈರುಹಾಜರು', ur: 'غیر حاضر' },
    'Late': { hi: 'विलंबित', mr: 'उशीर', kn: 'ತಡವಾಗಿ', ur: 'دیر سے' },
    'Half Day': { hi: 'आधा दिन', mr: 'अर्धा दिवस', kn: 'ಅರ್ಧ ದಿನ', ur: 'نصف دن' },
    'Male': { hi: 'पुरुष', mr: 'पुरुष', kn: 'ಪುರುಷ', ur: 'مرد' },
    'Female': { hi: 'महिला', mr: 'महिला', kn: 'ಮಹಿಳೆ', ur: 'عورت' },
    'Other': { hi: 'अन्य', mr: 'इतर', kn: 'ಇತರ', ur: 'دیگر' },
    'Cash': { hi: 'नकद', mr: 'रोख', kn: 'ನಗದು', ur: 'نقد' },
    'Online / UPI': { hi: 'ऑनलाइन / यूपीआई', mr: 'ऑनलाइन / UPI', kn: 'ಆನ್‌ಲೈನ್ / UPI', ur: 'آن لائن / یو پی آئی' },
    'Cheque': { hi: 'चेक', mr: 'धनादेश', kn: 'ಚೆಕ್', ur: 'چیک' },
    'Bank Transfer': { hi: 'बैंक ट्रांसफर', mr: 'बँक ट्रान्सफर', kn: 'ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ', ur: 'بینک ٹرانسفر' },

    // --- Dynamic Department & Role Strings ---
    'Accountant': { hi: 'लेखाकार (अकाउंटेंट)', mr: 'लेखापाल (अकाउंटंट)', kn: 'ಲೆಕ್ಕಪರಿಶೋಧಕ', ur: 'اکاؤنٹنٹ' },
    'Librarian': { hi: 'पुस्तकालयाध्यक्ष', mr: 'ग्रंथपाल', kn: 'ಗ್ರಂಥಪಾಲಕ', ur: 'لائبریرین' },
    'Finance': { hi: 'वित्त विभाग', mr: 'वित्त विभाग', kn: 'ಹಣಕಾಸು ವಿಭಾಗ', ur: 'شعبہ مالیات' },
    'Administration': { hi: 'प्रशासन विभाग', mr: 'प्रशासन विभाग', kn: 'ಆಡಳಿತ ವಿಭಾಗ', ur: 'انتظامی شعبہ' },
    'Faculty': { hi: 'संकाय / शिक्षक', mr: 'प्राध्यापक / शिक्षक', kn: 'ಬೋಧಕವರ್ಗ', ur: 'فیکلٹی' },

    // --- Days of Week & Calendar Headers ---
    'Sun': { hi: 'रवि', mr: 'रवि', kn: 'ಭಾನು', ur: 'اتوار' },
    'Mon': { hi: 'सोम', mr: 'सोम', kn: 'ಸೋಮ', ur: 'پیر' },
    'Tue': { hi: 'मंगल', mr: 'मंगळ', kn: 'ಮಂಗಳ', ur: 'منگل' },
    'Wed': { hi: 'बुध', mr: 'बुध', kn: 'ಬುಧ', ur: 'بدھ' },
    'Thu': { hi: 'गुरु', mr: 'गुरु', kn: 'ಗುರು', ur: 'جمعرات' },
    'Fri': { hi: 'शुक्र', mr: 'शुक्र', kn: 'ಶುಕ್ರ', ur: 'جمعہ' },
    'Sat': { hi: 'शनि', mr: 'शनि', kn: 'ಶನಿ', ur: 'ہفتہ' },
    'Monday': { hi: 'सोमवार', mr: 'सोमवार', kn: 'ಸೋಮವಾರ', ur: 'پیر' },
    'Tuesday': { hi: 'मंगलवार', mr: 'मंगळवार', kn: 'ಮಂಗಳವಾರ', ur: 'منگل' },
    'Wednesday': { hi: 'बुधवार', mr: 'बुधवार', kn: 'ಬುಧವಾರ', ur: 'بدھ' },
    'Thursday': { hi: 'गुरुवार', mr: 'गुरुवार', kn: 'ಗುರುವಾರ', ur: 'جمعرات' },
    'Friday': { hi: 'शुक्रवार', mr: 'शुक्रवार', kn: 'ಶುಕ್ರವಾರ', ur: 'جمعہ' },
    'Saturday': { hi: 'शनिवार', mr: 'शनिवार', kn: 'ಶನಿವಾರ', ur: 'ہفتہ' },
    'Sunday': { hi: 'रविवार', mr: 'रविवार', kn: 'ಭಾನುವಾರ', ur: 'اتوار' },

    // --- Empty State & Prompt Messages ---
    'Loading…': { hi: 'लोड हो रहा है…', mr: 'लोड होत आहे…', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ…', ur: 'لوڈ ہو رہا ہے…' },
    'Loading...': { hi: 'लोड हो रहा है…', mr: 'लोड होत आहे…', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ…', ur: 'لوڈ ہو رہا है…' },
    'No staff records found.': { hi: 'कोई कर्मचारी रिकॉर्ड नहीं मिला।', mr: 'कोणतीही कर्मचारी नोंद आढळली नाही.', kn: 'ಯಾವುದೇ ಸಿಬ್ಬಂದಿ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'عملے کا کوئی ریکارڈ نہیں ملا۔' },
    'No teacher records found.': { hi: 'कोई शिक्षक रिकॉर्ड नहीं मिला।', mr: 'कोणतीही शिक्षक नोंद आढळली नाही.', kn: 'ಯಾವುದೇ ಶಿಕ್ಷಕರ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'اساتذہ کا کوئی ریکارڈ نہیں ملا۔' },
    'No student records found.': { hi: 'कोई विद्यार्थी रिकॉर्ड नहीं मिला।', mr: 'कोणतीही विद्यार्थी नोंद आढळली नाही.', kn: 'ಯಾವುದೇ ವಿದ್ಯಾರ್ಥಿ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'طلباء کا کوئی ریکارڈ نہیں ملا۔' },
    'No enquiry records found.': { hi: 'कोई पूछताछ रिकॉर्ड नहीं मिला।', mr: 'कोणतीही चौकशी नोंद आढळली नाही.', kn: 'ಯಾವುದೇ ವಿಚಾರಣೆ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'معلومات کا کوئی ریکارڈ نہیں ملا۔' },
    'No active notice circulars found.': { hi: 'कोई सक्रिय सूचना परिपत्र नहीं मिला।', mr: 'कोणतेही सक्रिय सूचना परिपत्रक आढळले नाही.', kn: 'ಯಾವುದೇ ಸಕ್ರಿಯ ಪ್ರಕಟಣಾ ಸುತ್ತೋಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'کوئی فعال نوٹس یا سرکلر نہیں ملا۔' },
    'No fee transactions found.': { hi: 'कोई फीस लेन-देन नहीं मिला।', mr: 'कोणतेही फी व्यवहार आढळले नाहीत.', kn: 'ಯಾವುದೇ ಶುಲ್ಕ ವಹಿವಾಟುಗಳು ಕಂಡುಬಂದಿಲ್ಲ.', ur: 'فیس کا کوئی لین دین نہیں ملا۔' },
    'Select a report from the left menu to generate a preview.': { hi: 'पूर्वावलोकन तैयार करने के लिए बाएं मेनू से एक रिपोर्ट चुनें।', mr: 'पूर्वावलोकन तयार करण्यासाठी डाव्या मेनूमधून अहवाल निवडा.', kn: 'ಮುನ್ನೋಟವನ್ನು ರಚಿಸಲು ಎಡ ಮೆನುವಿನಿಂದ ವರದಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.', ur: 'پیش نظارہ حاصل کرنے کے لیے بائیں مینو سے رپورٹ منتخب کریں۔' },
    'Select date, class and section filters to load the attendance registry.': { hi: 'उपस्थिति रजिस्टर लोड करने के लिए तिथि, कक्षा और अनुभाग फ़िल्टर चुनें।', mr: 'उपस्थिती नोंदवही लोड करण्यासाठी तारीख, इयत्ता आणि तुकडी निवडा.', kn: 'ಹಾಜರಾತಿ ನೋಂದಣಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ದಿನಾಂಕ, ತರಗತಿ ಮತ್ತು ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.', ur: 'حاضری رجسٹر لوڈ کرنے کے لیے تاریخ، کلاس اور سیکشن منتخب کریں۔' },
    'Select Class & Section to view schedule.': { hi: 'समय सारणी देखने के लिए कक्षा और अनुभाग चुनें।', mr: 'वेळापत्रक पाहण्यासाठी इयत्ता आणि तुकडी निवडा.', kn: 'ವೇಳಾಪಟ್ಟಿ ವೀಕ್ಷಿಸಲು ತರಗತಿ ಮತ್ತು ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.', ur: 'شیڈول دیکھنے کے لیے کلاس اور سیکشن منتخب کریں۔' },
    'Select an exam from the left panel to manage marks.': { hi: 'अंक प्रबंधित करने के लिए बाएं पैनल से एक परीक्षा चुनें।', mr: 'गुण व्यवस्थापित करण्यासाठी डाव्या पॅनेलमधून परीक्षा निवडा.', kn: 'ಅಂಕಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಎಡ ಫಲಕದಿಂದ ಪರೀಕ್ಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.', ur: 'نمبرات کا انتظام کرنے کے لیے بائیں پینل سے امتحان منتخب کریں۔' },
    'Invalid username or password.': { hi: 'अमान्य उपयोगकर्ता नाम या पासवर्ड।', mr: 'अवैध वापरकर्तानाव किंवा पासवर्ड.', kn: 'ಅಮಾನ್ಯ ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್.', ur: 'غلط صارف کا نام یا پاس ورڈ۔' },
    'Secure Offline Administration — v1.0.0': { hi: 'सुरक्षित ऑफ़लाइन प्रशासन — v1.0.0', mr: 'सुरक्षित ऑफलाइन प्रशासन — v1.0.0', kn: 'ಸುರಕ್ಷಿತ ಆಫ್‌ಲೈನ್ ಆಡಳಿತ — v1.0.0', ur: 'محفوظ آف لائن انتظام — v1.0.0' },
    'Are you sure you want to sign out?': { hi: 'क्या आप वाकई साइन आउट करना चाहते हैं?', mr: 'तुम्हाला खात्री आहे की तुम्ही साइन आउट करू इच्छिता?', kn: 'ನೀವು ನಿಜವಾಗಿಯೂ ಸೈನ್ ಔಟ್ ಮಾಡಲು ಬಯಸುವಿರಾ?', ur: 'کیا آپ واقعی سائن آؤٹ کرنا چاہتے ہیں؟' }
  };

  let currentLanguage = localStorage.getItem('erp_language') || 'en';
  let observer = null;
  let isTranslating = false;

  /**
   * Normalize search text
   */
  function normalize(str) {
    return (str || '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Case-insensitive / Normalized dictionary lookup
   */
  function lookup(cleanKey) {
    if (DICTIONARY[cleanKey]) return DICTIONARY[cleanKey];
    
    // Fallback: Case-insensitive match
    const lower = cleanKey.toLowerCase();
    for (let k in DICTIONARY) {
      if (k.toLowerCase() === lower) {
        return DICTIONARY[k];
      }
    }
    return null;
  }

  /**
   * Translate a phrase using active language
   */
  function t(key, fallback) {
    if (!key) return '';
    const cleanKey = normalize(key);
    if (currentLanguage === 'en') {
      return fallback !== undefined ? fallback : cleanKey;
    }
    const entry = lookup(cleanKey);
    if (!entry) {
      return fallback !== undefined ? fallback : cleanKey;
    }
    return entry[currentLanguage] || fallback || cleanKey;
  }

  /**
   * Set and persist active language
   */
  function setLanguage(lang) {
    if (!LANGUAGES[lang]) lang = 'en';
    currentLanguage = lang;
    localStorage.setItem('erp_language', lang);

    // Apply RTL/LTR & language code
    const dir = LANGUAGES[lang].dir || 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);

    // Apply font styling for Urdu if needed
    if (lang === 'ur') {
      document.documentElement.classList.add('lang-urdu');
    } else {
      document.documentElement.classList.remove('lang-urdu');
    }

    // Sync all language dropdowns in DOM
    document.querySelectorAll('.lang-select-dropdown, #global-lang-select, #login-lang-select').forEach(sel => {
      sel.value = lang;
    });

    // Translate DOM
    translatePage();

    // Trigger custom event so modules can update dynamic items
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }

  /**
   * Get active language
   */
  function getLanguage() {
    return currentLanguage;
  }

  /**
   * Get available languages
   */
  function getLanguages() {
    return LANGUAGES;
  }

  /**
   * Recursively translate a DOM node and its children
   */
  function translateNode(node) {
    if (!node) return;

    // Skip script, style, SVG elements
    const tag = node.nodeName ? node.nodeName.toUpperCase() : '';
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'PATH') {
      return;
    }

    // 1. Text Nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const clean = normalize(text);
      if (!clean) return;

      // Check if original text was cached
      if (!node._origText) {
        const found = lookup(clean);
        if (found) {
          node._origText = clean;
        } else {
          // Check if reverse translated from another language
          for (let orig in DICTIONARY) {
            for (let l in DICTIONARY[orig]) {
              if (DICTIONARY[orig][l] === clean) {
                node._origText = orig;
                break;
              }
            }
            if (node._origText) break;
          }
        }
      }

      if (node._origText) {
        const translated = currentLanguage === 'en' ? node._origText : t(node._origText);
        const leading = text.match(/^\s*/)[0];
        const trailing = text.match(/\s*$/)[0];
        node.textContent = leading + translated + trailing;
      }
      return;
    }

    // 2. Element Nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      // 2a. Explicit data-i18n
      if (node.hasAttribute('data-i18n')) {
        const key = node.getAttribute('data-i18n');
        if (key) {
          node.textContent = currentLanguage === 'en' ? key : t(key);
          return;
        }
      }

      // 2b. Placeholder attribute
      if (node.hasAttribute('placeholder')) {
        if (!node._origPlaceholder) {
          node._origPlaceholder = node.getAttribute('placeholder');
        }
        const origPh = node._origPlaceholder;
        if (origPh) {
          const transPh = currentLanguage === 'en' ? origPh : t(origPh);
          node.setAttribute('placeholder', transPh);
        }
      }

      // 2c. Title attribute
      if (node.hasAttribute('title')) {
        if (!node._origTitle) {
          node._origTitle = node.getAttribute('title');
        }
        const origTi = node._origTitle;
        if (origTi) {
          const transTi = currentLanguage === 'en' ? origTi : t(origTi);
          node.setAttribute('title', transTi);
        }
      }

      // 2d. Option elements inside select
      if (tag === 'OPTION') {
        const optText = normalize(node.textContent);
        if (!node._origText) {
          const found = lookup(optText);
          if (found) {
            node._origText = optText;
          } else {
            for (let orig in DICTIONARY) {
              for (let l in DICTIONARY[orig]) {
                if (DICTIONARY[orig][l] === optText) {
                  node._origText = orig;
                  break;
                }
              }
              if (node._origText) break;
            }
          }
        }
        if (node._origText) {
          node.textContent = currentLanguage === 'en' ? node._origText : t(node._origText);
        }
        return;
      }

      // Recursively process child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i]);
      }
    }
  }

  /**
   * Translate the entire page
   */
  function translatePage() {
    if (isTranslating) return;
    isTranslating = true;

    try {
      if (observer) observer.disconnect();

      if (document.body) {
        translateNode(document.body);
      }

      startObserver();
    } catch (e) {
      console.warn('i18n: translation error', e);
    } finally {
      isTranslating = false;
    }
  }

  /**
   * Start MutationObserver to auto-translate dynamic DOM changes
   */
  function startObserver() {
    if (typeof MutationObserver === 'undefined') return;
    if (!observer) {
      observer = new MutationObserver((mutations) => {
        if (isTranslating) return;
        let shouldTranslate = false;
        for (const mut of mutations) {
          if (mut.type === 'childList' && mut.addedNodes.length > 0) {
            let isDropdown = false;
            for (const n of mut.addedNodes) {
              if (n.id === 'global-lang-select' || n.id === 'login-lang-select') {
                isDropdown = true;
                break;
              }
            }
            if (!isDropdown) {
              shouldTranslate = true;
              break;
            }
          }
        }
        if (shouldTranslate) {
          translatePage();
        }
      });
    }

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Initialize i18n
   */
  function init() {
    const saved = localStorage.getItem('erp_language') || 'en';
    setLanguage(saved);
    startObserver();
  }

  // Export to global window object
  window.i18n = {
    t,
    setLanguage,
    getLanguage,
    getLanguages,
    translatePage,
    translateNode,
    init,
    DICTIONARY,
    LANGUAGES
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
