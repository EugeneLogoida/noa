import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ICategoryRequest } from '../../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  private categoryCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) { 
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAll() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  create(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  update(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  delete(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
