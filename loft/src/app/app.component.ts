import { Component } from '@angular/core';
import { IVisita } from './data/i-visita';
import { ApartamentoService } from './services/apartamento.service';
import { PersonService } from './services/person.service';
import { VisitaService } from './services/visita.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loft';

  public visitaService: VisitaService;
  public apartamentoService: ApartamentoService;
  public personService: PersonService;

  constructor() {
    this.visitaService = new VisitaService();
    this.apartamentoService = new ApartamentoService();
    this.personService = new PersonService();


    const date = new Date().toISOString();

    this.apartamentoService.all().forEach((apartamento, index) => {
      this.visitaService.add(this.personService.get(index).id, apartamento.id, date);
    });

    const visitasCriadas = [...this.visitaService.all()];
    console.log(visitasCriadas);

    // this.visitaService.all().slice(4).forEach((visita) => this.visitaService.remove(visita));

    const visitasRemover = [this.visitaService.getByPersonAndDataVisita(this.personService.get(0).id, date)] as IVisita[];
    // const visitasRemover = [...this.visitaService.all().slice(4)];
    visitasRemover.forEach((visita) => this.visitaService.remove(visita));

    const visitasRemanescentes = [...this.visitaService.all()];
    console.log(visitasRemanescentes);

    this.visitaService.all().forEach((visita) => this.visitaService.concluir(visita));

    console.log(this.visitaService.allConcluidas());
  }
}
