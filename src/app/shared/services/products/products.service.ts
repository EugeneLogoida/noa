import { Injectable } from '@angular/core';

import {
  CollectionReference,
  DocumentData,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  IProductRequest,
  IProductResponse,
} from '../../interfaces/products.interface';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }


  async getOne(path: string) {
    const collectionReference = collection(this.afs, 'products');
    const querySnapshot = await getDocs(
      query(collectionReference, where('path', '==', path))
    );

    if (!querySnapshot.empty) {
      const documentSnapshot = querySnapshot.docs[0];
      const data = documentSnapshot.data();
      return { id: documentSnapshot.id, ...data } as IProductResponse;
    }

    return null;
  }
  



  create(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  update(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, { ...product });
  }

  delete(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
