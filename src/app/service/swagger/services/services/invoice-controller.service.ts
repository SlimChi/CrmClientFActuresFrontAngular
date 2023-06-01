/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { InvoiceDto } from '../models/invoice-dto';

@Injectable({
  providedIn: 'root',
})
export class InvoiceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateInvoice
   */
  static readonly UpdateInvoicePath = '/invoices/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoice$Response(params: {
    id: number;
    body?: InvoiceDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InvoiceDto>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.UpdateInvoicePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoice(params: {
    id: number;
    body?: InvoiceDto
  },
  context?: HttpContext

): Observable<InvoiceDto> {

    return this.updateInvoice$Response(params,context).pipe(
      map((r: StrictHttpResponse<InvoiceDto>) => r.body as InvoiceDto)
    );
  }

  /**
   * Path part for operation getAllInvoices
   */
  static readonly GetAllInvoicesPath = '/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<InvoiceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAllInvoicesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices(params?: {
  },
  context?: HttpContext

): Observable<Array<InvoiceDto>> {

    return this.getAllInvoices$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<InvoiceDto>>) => r.body as Array<InvoiceDto>)
    );
  }

  /**
   * Path part for operation createInvoice
   */
  static readonly CreateInvoicePath = '/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createInvoice$Response(params?: {
    body?: InvoiceDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InvoiceDto>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.CreateInvoicePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createInvoice(params?: {
    body?: InvoiceDto
  },
  context?: HttpContext

): Observable<InvoiceDto> {

    return this.createInvoice$Response(params,context).pipe(
      map((r: StrictHttpResponse<InvoiceDto>) => r.body as InvoiceDto)
    );
  }

  /**
   * Path part for operation getInvoiceById
   */
  static readonly GetInvoiceByIdPath = '/invoices/{invoiceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoiceById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceById$Response(params: {
    invoiceId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<InvoiceDto>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetInvoiceByIdPath, 'get');
    if (params) {
      rb.path('invoiceId', params.invoiceId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInvoiceById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceById(params: {
    invoiceId: number;
  },
  context?: HttpContext

): Observable<InvoiceDto> {

    return this.getInvoiceById$Response(params,context).pipe(
      map((r: StrictHttpResponse<InvoiceDto>) => r.body as InvoiceDto)
    );
  }

  /**
   * Path part for operation deleteInvoice
   */
  static readonly DeleteInvoicePath = '/invoices/{invoiceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInvoice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInvoice$Response(params: {
    invoiceId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.DeleteInvoicePath, 'delete');
    if (params) {
      rb.path('invoiceId', params.invoiceId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInvoice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInvoice(params: {
    invoiceId: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteInvoice$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
