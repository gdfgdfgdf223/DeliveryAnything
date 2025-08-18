export const translations = {
  en: {
    // Common
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Authentication
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    
    // Customer App
    home: 'Home',
    orders: 'Orders',
    profile: 'Profile',
    createDelivery: 'Create Delivery',
    pickupAddress: 'Pickup address',
    dropoffAddress: 'Dropoff address',
    whatAreSending: 'What are you sending?',
    
    // Courier App
    jobs: 'Jobs',
    earnings: 'Earnings',
    online: 'Online',
    offline: 'Offline',
    acceptJob: 'Accept',
    declineJob: 'Decline',
    
    // Order Statuses
    created: 'Created',
    assigned: 'Assigned',
    courierEnRoutePickup: 'En Route to Pickup',
    pickedUp: 'Picked Up',
    enRouteDropoff: 'Out for Delivery',
    delivered: 'Delivered',
    completed: 'Completed',
    canceled: 'Canceled',
    disputed: 'Disputed',
  },
  
  'pt-BR': {
    // Common
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    back: 'Voltar',
    next: 'Próximo',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    
    // Authentication
    login: 'Entrar',
    logout: 'Sair',
    register: 'Registrar',
    email: 'E-mail',
    password: 'Senha',
    forgotPassword: 'Esqueceu a senha?',
    
    // Customer App
    home: 'Início',
    orders: 'Pedidos',
    profile: 'Perfil',
    createDelivery: 'Criar Entrega',
    pickupAddress: 'Endereço de coleta',
    dropoffAddress: 'Endereço de entrega',
    whatAreSending: 'O que você está enviando?',
    
    // Courier App
    jobs: 'Trabalhos',
    earnings: 'Ganhos',
    online: 'Online',
    offline: 'Offline',
    acceptJob: 'Aceitar',
    declineJob: 'Recusar',
    
    // Order Statuses
    created: 'Criado',
    assigned: 'Atribuído',
    courierEnRoutePickup: 'A caminho da coleta',
    pickedUp: 'Coletado',
    enRouteDropoff: 'Em entrega',
    delivered: 'Entregue',
    completed: 'Concluído',
    canceled: 'Cancelado',
    disputed: 'Disputado',
  },
  
  nl: {
    // Common
    cancel: 'Annuleren',
    confirm: 'Bevestigen',
    save: 'Opslaan',
    delete: 'Verwijderen',
    edit: 'Bewerken',
    back: 'Terug',
    next: 'Volgende',
    loading: 'Laden...',
    error: 'Fout',
    success: 'Succes',
    
    // Authentication
    login: 'Inloggen',
    logout: 'Uitloggen',
    register: 'Registreren',
    email: 'E-mail',
    password: 'Wachtwoord',
    forgotPassword: 'Wachtwoord vergeten?',
    
    // Customer App
    home: 'Home',
    orders: 'Bestellingen',
    profile: 'Profiel',
    createDelivery: 'Bezorging Maken',
    pickupAddress: 'Ophaaladres',
    dropoffAddress: 'Bezorgadres',
    whatAreSending: 'Wat verstuur je?',
    
    // Courier App
    jobs: 'Opdrachten',
    earnings: 'Verdiensten',
    online: 'Online',
    offline: 'Offline',
    acceptJob: 'Accepteren',
    declineJob: 'Weigeren',
    
    // Order Statuses
    created: 'Aangemaakt',
    assigned: 'Toegewezen',
    courierEnRoutePickup: 'Onderweg naar ophaling',
    pickedUp: 'Opgehaald',
    enRouteDropoff: 'Onderweg naar bezorging',
    delivered: 'Bezorgd',
    completed: 'Voltooid',
    canceled: 'Geannuleerd',
    disputed: 'Betwist',
  },
};

export type Language = keyof typeof translations;

export function useTranslation(language: Language = 'en') {
  return {
    t: (key: keyof typeof translations.en) => {
      return translations[language][key] || translations.en[key] || key;
    },
    language,
  };
}