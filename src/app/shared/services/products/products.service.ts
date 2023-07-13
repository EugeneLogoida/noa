import { Injectable } from '@angular/core';

import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IProductRequest } from '../../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) { 
    this.productCollection = collection(this.afs, 'products');
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  create(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  update(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  delete(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
