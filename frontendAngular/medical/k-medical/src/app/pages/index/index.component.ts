import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Docteur } from 'src/app/monClass/Docteur';
import { Patient } from 'src/app/monClass/Patient';
import { RendezVous } from 'src/app/monClass/rendezVous';
import { DossierMedicalService } from 'src/app/monService/DossierMedical.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  listPatient: Patient[] = [];
  listDoc: Docteur[] = [];
  listRendezVous: RendezVous[] = [];
  nbrP: number;
  nbrD: number;
  rdv: number;
  doctorRendezVousChart: any;
  dateRendezVousChart: Chart<"bar", any[], any>;
  datepatientChart: Chart<"line", any[], string>;

  constructor(private dossierService: DossierMedicalService, private utilisateurService: UtilisateurService,
              private rendezvousService: RendezVousService) { }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.loadConfirmedAppointments();
    this.loadAppointmentsPerSpec();
    this.loadAppointmentsPerDate();
    this.loadPatientPerDate()
  }

  loadPatients(): void {
    this.rendezvousService.listPatient().subscribe((data: Patient[]) => {
      this.listPatient = data;
      this.nbrP = data.length;
    });
  }

  loadDoctors(): void {
    this.utilisateurService.listDocteur().subscribe((data: Docteur[]) => {
      this.listDoc = data;
      this.nbrD = data.length; // Update count of doctors
    }, error => {
      console.error('Error fetching doctors:', error);
    });
  }

  loadConfirmedAppointments(): void {
    this.rendezvousService.listrENDEZvOUScONFIRMER().subscribe((data: RendezVous[]) => {
      this.listRendezVous = data;
      this.rdv = data.length;
    });
  }

  loadAppointmentsPerSpec(): void {
    this.rendezvousService.getRendezVousCountByDocteur().subscribe(data => {
      console.log(data);  

       if (typeof data === 'object' && !Array.isArray(data)) {
        const labels = Object.keys(data);
        const appointmentCounts = Object.values(data);

         const ctx = document.getElementById('doctorRendezVousChart') as HTMLCanvasElement;
        this.doctorRendezVousChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Appointments',
              data: appointmentCounts,
               backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                // Add more colors as needed
              ],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    });
  }
 
  loadAppointmentsPerDate(): void {
    this.rendezvousService.getRendezVousCountByDate().subscribe(data => {
      console.log(data);
      if (Array.isArray(data)) {
        const labels = data.map(item => {
          const date = new Date(item[0]);
          return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        });
        const appointmentCounts = data.map(item => item[1]);

        const ctx = document.getElementById('dateRendezVousChart') as HTMLCanvasElement;
        this.dateRendezVousChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Appointments',
              data: appointmentCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                // Add more colors as needed
              ],
              borderColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                // Add more colors as needed
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    });
  }
  loadPatientPerDate(): void {
    this.utilisateurService.getPatientCountByDate().subscribe(data => {
      console.log(data);
      if (Array.isArray(data)) {
        const labels = data.map(item => {
          const date = new Date(item[0]);
          return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        });
        const patientCount = data.map(item => item[1]);
  
        const ctx = document.getElementById('datepatientChart') as HTMLCanvasElement;
        this.datepatientChart = new Chart(ctx, {
          type: 'line', // Change type to 'line' for an area chart
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Patients',
              data: patientCount,
              backgroundColor: 'red', // Fill color under the line
              borderColor: 'blue', // Line color
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true // Ensure the y-axis starts at zero
              }
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false
              }
            },
            elements: {
              line: {
                tension: 0.4 // Adjust tension for the line curve, 0 for straight lines
              }
            }
          }
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    });
  }
  
 
}
