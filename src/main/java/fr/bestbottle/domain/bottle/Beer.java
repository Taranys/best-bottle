package fr.bestbottle.domain.bottle;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class Beer extends Bottle {
    @Column(name = "color")
    @Enumerated(EnumType.STRING)
    private Type test;
}
