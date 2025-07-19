import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "title": "SportPulse Analytics Dashboard",
      "barChartTitle": "Top Players Statistics",
      "lineChartTitle": "Performance Over Time"
    }
  },
  fr: {
    translation: {
      "title": "Tableau de bord SportPulse Analytics",
      "barChartTitle": "Statistiques des meilleurs joueurs",
      "lineChartTitle": "Performance au fil du temps"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
