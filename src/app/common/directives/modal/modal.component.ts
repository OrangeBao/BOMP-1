import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Modal } from '../../models/modal';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: {
    '[style.display]': "showModal ? 'block' : 'none'"
  }
})
export class ModalComponent implements OnInit {

  @Input() maskClose: boolean = false;
  @Input() modalId: string;
  @Input() title: string;
  @Input() okText: string;
  @Output() ok = new EventEmitter<any>();
  @Input() cancelText: string;
  @Output() cancel = new EventEmitter<any>();

  @Input() isShowCancel: boolean = true;

  defaultOkText = '确定';
  defaultCancelText = '取消';

  showModal:boolean = false;

  get isShowCancelGet() {
    return this.isShowCancel && this.cancel.observers.length;
  }

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalService.getMessage().subscribe((modal: Modal) => {
      if (this.modalId === modal.modalId) {
        this.showModal = modal.flag;
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  execOk() {
    this.ok.emit();
  }

  execCancel() {
    this.cancel.emit();
  }

  maskClick() {
    if (this.maskClose) {
      this.closeModal();
    }
  }

}
