import {InjectionToken} from '@angular/core';


export interface GlobalConfig{
	mainApiUrl:string;
	apiKey:string;
}

export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>('global_config');

export const config:GlobalConfig = {
	mainApiUrl:'https://cavatica-api.sbgenomics.com/v2/',
	apiKey:'5b62b55bdc17407c84d4d9a23d235513'
}