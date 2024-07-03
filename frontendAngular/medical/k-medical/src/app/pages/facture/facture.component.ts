import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Invoice } from 'src/app/monClass/Invoice';
import { RendezVous } from 'src/app/monClass/rendezVous';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { InvoiceService } from 'src/app/monService/invoice.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  invoices: Invoice[] = [];
  utilisateur:any
   selectedInvoice: any;
  constructor(private invoiceService: InvoiceService,private router: Router, private rendezvousService: RendezVousService, 
    public adminService: AdminService, private authAdmin: AdminAuthService) {}

  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        console.log(data)
        this.utilisateur = data
         if (this.adminService.rolesMatch(['DOCTEUR'])) {
          this.invoiceService.getInvoicesByDoctor(this.utilisateur.id).subscribe((data: Invoice[]) => {
            this.invoices = data;
          });
        }
        else if (this.adminService.rolesMatch(['ASSISTANT'] )|| this.adminService.rolesMatch(['SECRITAIRE'])) {
          this.invoiceService.getInvoicesByDoctor(this.utilisateur.docteur.id).subscribe((data: Invoice[]) => {
            this.invoices = data;
            console.log(data)

          })
           

        } else if (this.adminService.rolesMatch(['SUPERADMIN'])) {
          this.invoiceService.allInvoice().subscribe((data: Invoice[]) => {
            this.invoices = data;
            console.log(data)
          })
        }else{
          this.router.navigate(['/index'])
        }

      })
    }else {
          this.authAdmin.logout()
          this.router.navigate(['/login'])
        }
    this.loadInvoices();
  }
 
  loadInvoices(): void {
    this.invoiceService.allInvoice().subscribe((data: Invoice[]) => {
      this.invoices = data;
    });
  }
 
  openInvoiceModal(invoice: any) {
      this.selectedInvoice = invoice;
  }
  printInvoice() {
    const printableContent = document.getElementById('invoiceModal');

    if (printableContent) {
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printableContent.innerHTML;

        window.print();

        document.body.innerHTML = originalContents;
    } else {
        console.error('Modal content not found.');
    }
}


}
