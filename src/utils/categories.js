const categoriesData = [
  { 
    value: 'all',
    text: 'Другое',
  },
  { 
    value: 'culture',
    text: 'Культура',
  },
  { 
    value: 'homeland',
    text: 'Родина',
  },
  { 
    value: 'history',
    text: 'История',
  },
  { 
    value: 'science',
    text: 'Наука',
  },
  { 
    value: 'nature',
    text: 'Природа',
  },
  { 
    value: 'family',
    text: 'Семья',
  },
  { 
    value: 'relationship',
    text: 'Отношения',
  }
  ]
// пришлось создать доп объект с категориями, т.к. нет времени передалать логику и массив выше под эту логику во всех местах  Т_т
const categoriesMobileData = {
  all: 'Все',
  culture: 'Культура',
  homeland: 'Родина',
  history: 'История',
  science: 'Наука',
  nature: 'Природа',
  family: 'Семья',
  relationship: 'Отношения'
}

export { categoriesData, categoriesMobileData };