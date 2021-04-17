import { Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MappedCurrencyRateObject } from '../interface/exchange-rates.model';
import { StorageService } from './storage.service';

export interface PeriodicHistoryElement {
    date: string;
    id: number;
    exchangeRate: string;
    pureExchangeRate?: number;
    fromCurrency?: string;
    toCurrency?: string;
    amount?: number;
}

@Injectable()
export class CurrencyExchangeService implements OnInit {
    public converterForm: FormGroup = new FormGroup({
        amountControl: new FormControl('', [Validators.required]),
        fromControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        toControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    public periodicHistoryExchangeRates: PeriodicHistoryElement[] =
        <PeriodicHistoryElement[]>StorageService.getObject('exchangeRates') || [];
    public exchangeRates: MappedCurrencyRateObject[];
    public fromCurrencies: string[] = [];
    public toCurrencies: string[] = [];

    constructor() {}

    ngOnInit() {}

}
