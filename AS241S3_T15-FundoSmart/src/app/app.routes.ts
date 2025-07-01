import { Routes } from '@angular/router';
import { PerfilClienteComponent } from './feature/perfil-cliente/perfil-cliente.component';
// Forms
import { ContinuarComponent } from './feature/forms/continuar/continuar.component';
import { FormsMercadoComponent } from './feature/forms/forms-mercado/forms-mercado.component';
import { FormsSupermercadoComponent } from './feature/forms/forms-supermercado/forms-supermercado.component';

// Payment
import { CorreoComponent } from './feature/payment/correo/correo.component';

import { SellerFormComponent } from './feature/seller/seller-form/seller-form.component';
import { SellerListComponent } from './feature/seller/seller-list/seller-list.component';

import { MenuFormComponent } from './feature/menu/menu-form/menu-form.component';
import { MenuListComponent } from './feature/menu/menu-list/menu-list.component';

import { NewRegisterFormComponent } from './feature/new-register/new-register-form/new-register-form.component';
import { NewRegisterListComponent } from './feature/new-register/new-register-list/new-register-list.component';

import { RecordsFormComponent } from './feature/records/records-form/records-form.component';
import { RecordsListComponent } from './feature/records/records-list/records-list.component';

import { LibraryFormComponent } from './feature/library/library-form/library-form.component';
import { LibraryListComponent } from './feature/library/library-list/library-list.component';

import { ContactsFormComponent } from './feature/contacts/contacts-form/contacts-form.component';
import { ContactsListComponent } from './feature/contacts/contacts-list/contacts-list.component';

import { PrepareGuideFormComponent } from './feature/prepare-guide/prepare-guide-form/prepare-guide-form.component';
import { PrepareGuideListComponent } from './feature/prepare-guide/prepare-guide-list/prepare-guide-list.component';

import { MakeGuideFormComponent } from './feature/make-guide/make-guide-form/make-guide-form.component';
import { MakeGuideListComponent } from './feature/make-guide/make-guide-list/make-guide-list.component';

import { SellFormComponent } from './feature/sell/sell-form/sell-form.component';
import { SellListComponent } from './feature/sell/sell-list/sell-list.component';
// Nuevos componentes tipo Client
import { FrutillasClienteComponent } from './feature/fruitSections/frutillas-cliente/frutillas-cliente.component';
import { RefrescantesClienteComponent } from './feature/fruitSections/refrescantes-cliente/refrescantes-cliente.component';
import { SemillasGrandesClienteComponent } from './feature/fruitSections/semillas-grandes-cliente/semillas-grandes-cliente.component';
import { SemillasPequenasClienteComponent } from './feature/fruitSections/semillas-pequenas-cliente/semillas-pequenas-cliente.component';
import { TropicalesClienteComponent } from './feature/fruitSections/tropicales-cliente/tropicales-cliente.component';
import { CitricosClienteComponent } from './feature/fruitSections/citricos-cliente/citricos-cliente.component';

// Market Customer
import { MarketCustomerFormComponent } from './feature/market-customer/market-customer-form/market-customer-form.component';
import { MarketCustomerListComponent } from './feature/market-customer/market-customer-list/market-customer-list.component';

// Supermarket Customer
import { SupermarketCustomerFormComponent } from './feature/supermarket-customer/supermarket-customer-form/supermarket-customer-form.component';
import { SupermarketCustomerListComponent } from './feature/supermarket-customer/supermarket-customer-list/supermarket-customer-list.component';

import { ViewContactFormComponent } from './feature/view-contact/view-contact-form/view-contact-form.component';
import { ViewContactListComponent } from './feature/view-contact/view-contact-list/view-contact-list.component';

// Nuevos componentes tipo Client en feature/
import { HomeClientComponent } from './feature/home/home-client/home-client.component';
import { SectionsClientComponent } from './feature/sections/sections-client/sections-client.component';
import { FruitDataClientComponent } from './feature/fruitData/fruit-data-client/fruit-data-client.component';
import { CartClientComponent } from './feature/cart/cart-client/cart-client.component';
import { PaymentClientComponent } from './feature/payment/payment-client/payment-client.component';
import { HistorialComponent } from './feature/historial/historial.component';


import { EditMarketCustomerModalComponent } from './feature/edit-customer/edit-market-customer-modal/edit-market-customer-modal.component';
import { EditSupermarketCustomerModalComponent } from './feature/view-contact/edit-supermarket-customer-modal/edit-supermarket-customer-modal.component';


export const routes: Routes = [
    // Seller
    {
        path: 'seller-form',
        component: SellerFormComponent
    },
    {
        path: 'seller-list',
        component: SellerListComponent
    },
    // Nuevas rutas tipo Client
    { path: 'frutillas-cliente', component: FrutillasClienteComponent },
    { path: 'refrescantes-cliente', component: RefrescantesClienteComponent },
    { path: 'semillas-grandes-cliente', component: SemillasGrandesClienteComponent },
    { path: 'semillas-pequenas-cliente', component: SemillasPequenasClienteComponent },
    { path: 'tropicales-cliente', component: TropicalesClienteComponent },
    { path: 'citricos-cliente', component: CitricosClienteComponent },
    {
        path: 'historial',
        component: HistorialComponent
    },

    // Menu
    {
        path: 'menu-form',
        component: MenuFormComponent
    },
    {
        path: 'perfil-cliente',
        component: PerfilClienteComponent
    },
    {
        path: 'menu-list',
        component: MenuListComponent
    },
    // Forms
    { path: 'continuar', component: ContinuarComponent },
    { path: 'forms-mercado', component: FormsMercadoComponent },
    { path: 'forms-supermercado', component: FormsSupermercadoComponent },

    // Payment
    { path: 'correo', component: CorreoComponent },

    // New Register
    {
        path: 'new-register-form',
        component: NewRegisterFormComponent
    },
    {
        path: 'new-register-list',
        component: NewRegisterListComponent
    },

    // Records
    {
        path: 'records-form',
        component: RecordsFormComponent
    },
    {
        path: 'records-list',
        component: RecordsListComponent
    },

    // Library
    {
        path: 'library-form',
        component: LibraryFormComponent
    },
    {
        path: 'library-list',
        component: LibraryListComponent
    },

    // Contacts
    {
        path: 'contacts-form',
        component: ContactsFormComponent
    },
    {
        path: 'contacts-list',
        component: ContactsListComponent
    },

    // Prepare Guide
    {
        path: 'prepare-guide-form',
        component: PrepareGuideFormComponent
    },
    {
        path: 'prepare-guide-list',
        component: PrepareGuideListComponent
    },

    // Make Guide
    {
        path: 'make-guide-form',
        component: MakeGuideFormComponent
    },
    {
        path: 'make-guide-list',
        component: MakeGuideListComponent
    },

    // Sell
    {
        path: 'sell-form',
        component: SellFormComponent
    },
    {
        path: 'sell-list',
        component: SellListComponent
    },
    // Market Customer
    { path: 'market-customer-form', component: MarketCustomerFormComponent },
    { path: 'market-customer-list', component: MarketCustomerListComponent },

    // Supermarket Customer
    { path: 'supermarket-customer-form', component: SupermarketCustomerFormComponent },
    { path: 'supermarket-customer-list', component: SupermarketCustomerListComponent },

    // View Contact
    {
        path: 'view-contact-form',
        component: ViewContactFormComponent
    },
    {
        path: 'view-contact-list',
        component: ViewContactListComponent
    },

    {
        path: 'edit-market-customer-modal',
        component: EditMarketCustomerModalComponent
    },
    {
        path: 'edit-supermarket-customer-modal',
        component: EditSupermarketCustomerModalComponent
    },
    // Home
    { path: 'home-client', component: HomeClientComponent },

    // Sections
    { path: 'sections-client', component: SectionsClientComponent },

    // Fruit Data
    { path: 'fruit-data-client/:id', component: FruitDataClientComponent },

    // Cart
    { path: 'cart-client', component: CartClientComponent },

    // Payment
    { path: 'payment-client', component: PaymentClientComponent },


    // Default redirect
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu-form'
    }
];
