import $ from 'jquery';
import {history} from 'backbone';
import AppRouter from './routers/appRouter';


$(() => {
	const appRouter =  new AppRouter();
	history.start();
})
