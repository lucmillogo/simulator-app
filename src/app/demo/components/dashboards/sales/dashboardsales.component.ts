import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/demo/service/product.service';
import { AppConfig, LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboardsales.component.html',
    styles: [`
    :host ::ng-deep .p-timeline-event-opposite {
        flex: 0;
        padding: 0 !important;
    };
    .grid {
        display: flex
    ;
        flex-wrap: wrap;
        margin-right: -1rem;
        margin-left: -1rem;
        margin-top: -1.5rem;
        margin-bottom: -1.5rem;
    }
`,]
})
export class DashboardSalesComponent implements OnInit, OnDestroy {

    config!: AppConfig;

    subscription!: Subscription;
    data: any;

    options: any;
    lastData = 0;

    @ViewChild('chatcontainer') chatContainerViewChild!: ElementRef;
    capital: number = 0;
    duree = 0;
    debut: Date;
    taux = 6.5;
    //taux = 5;
    documentStyle: any;
    textColor: any;
    textColorSecondary: any;
    surfaceBorder: any;
    typePeriode = 'ANNEE';
    donnees: number[] = [];
    capitalInteret = 0;
    miseAnnuel = 0;
    interet = 0;

    constructor(private productService: ProductService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
        });
        this.debut = new Date();
        this.documentStyle = getComputedStyle(document.documentElement);
        this.textColor = this.documentStyle.getPropertyValue('--text-color');
        this.textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
        this.surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    }

    ngOnInit() {
        this.onCapitalChange();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getNextPeriod(date: Date, period: number): string {
        if (this.typePeriode === 'ANNEE') {
            const newDate: Date = new Date(date.getFullYear() + period, date.getMonth() + 1, date.getDate());
            return newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate();
        } else {
                console.log('periode ++0++ ', date.getMonth() + period + 1 + 'periode ++2++ ', period);
            //else {
            let number = date.getMonth() + period + 1;
                const newDate: Date = new Date(date.getFullYear(), date.getMonth() + period, date.getDate());
                    //return this.getStringDay(newDate);
            //return newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate();
            return this.getDate(newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate())
            //}

        }
    }

    getStringDay(date: Date): string {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    getData(data: number): number {
        this.lastData = data + (data * this.taux / 100);
        return this.lastData
    }

    arrondirAvecDecimales(montant: number, decimales: number): number {
        const facteur = Math.pow(10, decimales);
        return Math.round(montant * facteur) / facteur;
    }

    onCapitalChange() {
        if (this.capital && this.duree && this.taux && this.debut) {
            this.data = {
                labels: this.getPeriode(this.duree, this.typePeriode),
                datasets: [
                    {
                        type: 'line',
                        label: 'Courbe de tendance',
                        borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        data: this.returnData()
                    },
                    {
                        type: 'bar',
                        label: 'Capital',
                        backgroundColor: this.documentStyle.getPropertyValue('--green-500'),
                        data: this.returnData(),
                        borderColor: 'white',
                        borderWidth: 2
                    },

                ]
            };
        }
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder
                    }
                }
            }
        };
    }

    returnData(): number[] {
        let donne = this.capital;
        let datas: number[] = [];
        let i = 0;
        datas.push(this.capital);
        while (i < this.duree) {
            if (this.miseAnnuel > 0 && i > 0) {
                donne = (donne + this.miseAnnuel) + ((donne + this.miseAnnuel) * this.taux / 100);
            } else {
                donne = donne + (donne * this.taux / 100);
            }

            console.log('follow datas  ==== ', donne);
           datas.push(this.arrondirAvecDecimales(donne, 2));
           i++;
        }
        this.donnees = datas;
        this.capitalInteret = this.arrondirAvecDecimales(datas[datas.length - 1], 2);
        this.interet = this.arrondirAvecDecimales(this.capitalInteret - this.capital, 2);
        console.log('datas  ==== ', datas);
        return datas;
    }

    getPeriode(duree: number, typePeriode: string): string[] {
        let periodes: string[] = [];
        periodes.push(this.getNextPeriod(this.debut, 0));
        let i = 0;
        while (i < duree) {
            if (typePeriode === 'ANNEE') {
                periodes.push(this.getNextPeriod(this.debut, i + 1));
            } else {
                periodes.push(this.getNextPeriod(this.debut, i + 1));
            }
            i++;
        }

        return periodes;
    }

    getDate(date: string): string {
        console.log('comming date ;;; ', date);
        const newDate: string[] = date.split('-');
        //if ((parseInt(newDate[0]) === this.debut.getFullYear())) {
            return newDate[0] + '-' + (parseInt(newDate[1]) + 1) + '-' + newDate[2];
        /*} else {
            return newDate[0] + '-' + (parseInt(newDate[1]) + 1) + '-' + newDate[2];
        }*/
    }
}
