import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

import app from './fireConfig.js';

import { form } from './domSelect.js';
import formController from './form.js';
import graphController from './graph.js';

const db = getFirestore(app);
const dbName = 'chase';

form.addEventListener('submit', event => {
  event.preventDefault();
  formController(async data => {
    await addDoc(collection(db, dbName), data);
  });
});

let data = [];
onSnapshot(collection(db, dbName), doc => {
  doc.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      case 'modified':
        data = data.map(item => (item.id === doc.id ? doc : item));
        break;
      default:
        break;
    }
  });

  graphController(data);
});
