import { IVisita } from "../data/i-visita";

export class VisitaService {

    private visitas: IVisita[];
    private concluidas: IVisita[];

    constructor() {
        this.visitas = [];
        this.concluidas = [];
    }

    public add(idPerson: number, idApartamento: number, date: string) {

        if (this.hasVisita(idApartamento, date)) {
            throw new Error(`Apartamento ${idApartamento} já possui agendamento marcado para o horário ${date}`);
        }

        this.visitas.push({ idPerson: idPerson, idApartamento: idApartamento, dataVisita: date });
    }

    public remove(visita: IVisita) {
        this.visitas.splice(this.visitas.indexOf(visita), 1);
    }

    public concluir(visita: IVisita) {
        this.concluidas.push(visita);
    }

    public hasVisita(idApartamento: number, date: string) {
        return this.visitas.some((v) => v.idApartamento === idApartamento && v.dataVisita === date);
    }

    public get(id: number) {
        return this.visitas[id];
    }

    public getByPersonAndDataVisita(idPerson: number, dataVisita: string) {
        return this.visitas.find((v) => v.idPerson === idPerson && v.dataVisita === dataVisita);
    }

    public all() {
        return this.visitas;
    }

    public allConcluidas() {
        return this.concluidas;
    }
}