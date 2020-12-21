import { FormControl } from "@angular/forms";

export class RemittanceDetailGroupForm {
    public readonly transactionDate = new FormControl(new Date());
    public readonly appliedAmount = new FormControl(0);
    public readonly balanceDue = new FormControl(0);
    public readonly feePercentage = new FormControl(0);
    public readonly recoveryTypeId = new FormControl(0);
    public readonly coinsurance = new FormControl(0);
    public readonly disbursementTypeId = new FormControl(0);
    public readonly remitTypeId = new FormControl(0);
    public readonly writeOff = new FormControl(0);
    public readonly disbursementReasonId = new FormControl(0);
    public readonly note = new FormControl('a');
    public readonly recoveryAmount = new FormControl(0);
    public readonly disbursement = new FormControl(0);
    public readonly payee = new FormControl(0);
    public readonly notes = new FormControl('aa');
    public readonly ardInitials = new FormControl(0);
    public readonly ardPercentage = new FormControl(0);
    public readonly ardValue = new FormControl(0);
    public readonly auditorInitials = new FormControl(0);
    public readonly auditorPercentage = new FormControl(0);
    public readonly auditorValue = new FormControl(0);
    public readonly total = new FormControl(0);
}