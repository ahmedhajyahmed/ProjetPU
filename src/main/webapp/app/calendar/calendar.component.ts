import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { CalendarService } from 'app/calendar/calendar.service';
import { IRendezVous, RendezVous } from 'app/shared/model/rendez-vous.model';
import * as moment from 'moment';

@Component({
    selector: 'jhi-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['calendar.css']
})
export class CalendarComponent implements OnInit {
    calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin];
    calendarEvents: any[] = [];
    rendezVous: IRendezVous;
    title: any;
    expert: any;
    constructor(private svc: CalendarService) {}

    handleEventClick(info) {
        // handler method
        this.title = info.event.title;
        const popup = document.getElementById('pop-up-affiche');
        popup.style.display = 'block';
        // alert('Event: ' + info.event.title);
        // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        // alert('View: ' + info.view.type);
        info.el.style.borderColor = 'red';
        info.jsEvent.preventDefault();
    }

    closePopupAffiche() {
        const popup = document.getElementById('pop-up-affiche');
        popup.style.display = 'none';
    }

    handleDateClick(info) {
        const popup = document.getElementById('pop-up-insere');
        popup.style.display = 'block';
    }

    closePopupInsere() {
        const popup = document.getElementById('pop-up-insere');
        popup.style.display = 'none';
    }

    putData(arg) {
        const title = (<HTMLInputElement>document.getElementById('title')).value;
        const date = (<HTMLInputElement>document.getElementById('date')).value;
        // alert(title+ date);
        this.rendezVous = new RendezVous();
        this.rendezVous.title = title;
        this.rendezVous.start = moment(date);
        this.svc.getExpert().subscribe(expert => (this.expert = expert));
        this.rendezVous.expert = this.expert;
        // alert(this.rendezVous.expert.id);
        this.svc.postData(this.rendezVous).subscribe();
        window.location.reload();
    }

    ngOnInit() {
        this.svc.getData().subscribe(data => (this.calendarEvents = data));
    }
}
