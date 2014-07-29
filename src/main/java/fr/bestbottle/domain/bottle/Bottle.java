package fr.bestbottle.domain.bottle;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Arrays;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Bottle implements Serializable {

    @Id
    @GeneratedValue
    @NotNull
    private Long id;

    @Size(min = 0, max = 100)
    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "preview", columnDefinition = "mediumblob")
    private byte[] preview;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPreview() {
        return preview;
    }

    public void setPreview(byte[] preview) {
        this.preview = preview;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Bottle bottle = (Bottle) o;

        if (description != null ? !description.equals(bottle.description) : bottle.description != null) return false;
        if (id != null ? !id.equals(bottle.id) : bottle.id != null) return false;
        if (name != null ? !name.equals(bottle.name) : bottle.name != null) return false;
        if (!Arrays.equals(preview, bottle.preview)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (preview != null ? Arrays.hashCode(preview) : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Bottle{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", preview=" + Arrays.toString(preview) +
                '}';
    }
}
