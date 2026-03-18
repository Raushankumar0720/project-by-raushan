import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      marketplace: 'Marketplace',
      howItWorks: 'How It Works',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard',
      
      // Landing
      heroTitle: 'Connecting Farmers Directly With Buyers',
      heroSubtitle: 'Eliminate middlemen, get better prices, and ensure fair trade.',
      exploreMarketplace: 'Explore Marketplace',
      registerAsFarmer: 'Register as Farmer',
      
      // Stats
      farmers: 'Farmers',
      transactions: 'Transactions',
      clustersFormed: 'Clusters Formed',
      
      // Roles
      farmer: 'Farmer',
      buyer: 'Buyer',
      transporter: 'Transporter',
      agent: 'Agent',
      admin: 'Admin',
      
      // Common
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      price: 'Price',
      quantity: 'Quantity',
      status: 'Status',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      order: 'Order',
      details: 'Details',
      
      // Dashboard
      myCrops: 'My Crops',
      addCrop: 'Add New Crop',
      marketPrices: 'Market Prices',
      orders: 'Orders',
      activeOrders: 'Active Orders',
      totalRevenue: 'Total Revenue',
      totalSpent: 'Total Spent',
      
      // Messages
      loading: 'Loading...',
      noData: 'No data available',
      success: 'Success',
      error: 'Error',
    }
  },
  hi: {
    translation: {
      // Navigation
      home: 'होम',
      marketplace: 'मंडी',
      howItWorks: 'कैसे काम करता है',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      login: 'लॉगिन',
      signup: 'साइन अप',
      logout: 'लॉगआउट',
      dashboard: 'डैशबोर्ड',
      
      // Landing
      heroTitle: 'किसानों को सीधे खरीदारों से जोड़ना',
      heroSubtitle: 'बिचौलियों को हटाएं, बेहतर कीमतें पाएं।',
      exploreMarketplace: 'मंडी देखें',
      registerAsFarmer: 'किसान के रूप में पंजीकरण करें',
      
      // Stats
      farmers: 'किसान',
      transactions: 'लेनदेन',
      clustersFormed: 'क्लस्टर बने',
      
      // Roles
      farmer: 'किसान',
      buyer: 'खरीदार',
      transporter: 'परिवहनकर्ता',
      agent: 'एजेंट',
      admin: 'एडमिन',
      
      // Common
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      price: 'कीमत',
      quantity: 'मात्रा',
      status: 'स्थिति',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
      order: 'ऑर्डर',
      details: 'विवरण',
      
      // Dashboard
      myCrops: 'मेरी फसलें',
      addCrop: 'नई फसल जोड़ें',
      marketPrices: 'मंडी भाव',
      orders: 'ऑर्डर',
      activeOrders: 'सक्रिय ऑर्डर',
      totalRevenue: 'कुल आय',
      totalSpent: 'कुल खर्च',
      
      // Messages
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा नहीं',
      success: 'सफल',
      error: 'त्रुटि',
    }
  },
  gu: {
    translation: {
      // Navigation
      home: 'હોમ',
      marketplace: 'મંડી',
      howItWorks: 'કેવી રીતે કામ કરે છે',
      about: 'અમારા વિશે',
      contact: 'સંપર્ક',
      login: 'લોગિન',
      signup: 'સાઇન અપ',
      logout: 'લોગઆઉટ',
      dashboard: 'ડૅશબોર્ડ',
      
      // Landing
      heroTitle: 'ખેડૂતોને સીધા ખરીદારો સાથે જોડો',
      heroSubtitle: 'મધ્યસ્થીઓને દૂર કરો, સારી કિમતો મેળવો.',
      exploreMarketplace: 'મંડી જુઓ',
      registerAsFarmer: 'ખેડૂત તરીકે નોંધણી કરો',
      
      // Stats
      farmers: 'ખેડૂતો',
      transactions: 'વ્યવહારો',
      clustersFormed: 'ક્લસ્ટર બન્યા',
      
      // Roles
      farmer: 'ખેડૂત',
      buyer: 'ખરીદાર',
      transporter: 'પરિવહનકર્તા',
      agent: 'એજન્ટ',
      admin: 'એડમિન',
      
      // Common
      search: 'શોધ',
      filter: 'ફિલ્ટર',
      sort: 'ક્રમ',
      price: 'કિમત',
      quantity: 'જથ્થો',
      status: 'સ્થિતિ',
      submit: 'સબમિટ',
      cancel: 'રદ કરો',
      save: 'સેવ',
      delete: 'કાઢો',
      edit: 'સંપાદન',
      view: 'જુઓ',
      order: 'ઓર્ડર',
      details: 'વિગતો',
      
      // Dashboard
      myCrops: 'મારી પાકો',
      addCrop: 'નવી પાક ઉમેરો',
      marketPrices: 'મંડી ભાવ',
      orders: 'ઓર્ડર',
      activeOrders: 'સક્રિય ઓર્ડર',
      totalRevenue: 'કુલ આવક',
      totalSpent: 'કુલ ખર્ચ',
      
      // Messages
      loading: 'લોડ થઈ રહ્યું છે...',
      noData: 'કોઈ ડેટા નથી',
      success: 'સફળ',
      error: 'ભૂલ',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
