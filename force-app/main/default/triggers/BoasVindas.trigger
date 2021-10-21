trigger BoasVindas on Account (after insert) {
    Account a = Trigger.New[0];
    Datetime dataDeCriacao = Datetime.now();
	dataDeCriacao = dataDeCriacao.Adddays(1);
    System.Debug('Data de criação: ' + dataDeCriacao);
	System.Debug('Account name: ' + a.Name);
    System.Debug('Account owner: ' + a.OwnerId);
    Event event = new Event(Subject ='Dar boas vindas ao ' + a.Name, IsAllDayEvent = true, StartDateTime = dataDeCriacao, EndDateTime = dataDeCriacao, OwnerId = a.OwnerId, WhatId = a.Id); 
    insert event;
}