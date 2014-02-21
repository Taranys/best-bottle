package fr.taranys.bestbottle.rest;

import fr.taranys.bestbottle.domain.Message;
import fr.taranys.bestbottle.Roles;
import org.joda.time.DateTime;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.security.PermitAll;
import restx.security.RolesAllowed;

@Component @RestxResource
public class HelloResource {
    @GET("/message")
    @PermitAll
    public Message sayHello(String who) {
        return new Message().setMessage(String.format(
                "hello %s, it's %s",
                who, DateTime.now().toString("HH:mm:ss")));
    }
}
