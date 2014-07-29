package fr.bestbottle.domain.bottle;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class Wine extends Bottle {
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private Type type;
}
