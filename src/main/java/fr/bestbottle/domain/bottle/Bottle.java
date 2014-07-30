package fr.bestbottle.domain.bottle;

import fr.bestbottle.domain.AbstractAuditingEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Table(name = "T_BOTTLE")
@Inheritance(strategy = InheritanceType.JOINED)
public class Bottle extends AbstractAuditingEntity implements Serializable {
	@Id
	@GeneratedValue
	@NotNull
	private Long id;

	@Size(min = 0, max = 100)
	private String name;

	@Enumerated(EnumType.STRING)
	private BottleType type;

	@Size(min = 0, max = 10)
	private int rate;

	@Column(columnDefinition = "text")
	private String description;

	@Column(columnDefinition = "text")
	private String preview;

	@OneToMany
	private Collection<Opinion> opinions;

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

	public String getPreview() {
		return preview;
	}

	public void setPreview(String preview) {
		this.preview = preview;
	}

	public BottleType getType() {
		return type;
	}

	public void setType(BottleType type) {
		this.type = type;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Bottle)) return false;

		Bottle bottle = (Bottle) o;

		if (rate != bottle.rate) return false;
		if (description != null ? !description.equals(bottle.description) : bottle.description != null) return false;
		if (id != null ? !id.equals(bottle.id) : bottle.id != null) return false;
		if (name != null ? !name.equals(bottle.name) : bottle.name != null) return false;
		if (preview != null ? !preview.equals(bottle.preview) : bottle.preview != null) return false;
		if (type != bottle.type) return false;

		return true;
	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (name != null ? name.hashCode() : 0);
		result = 31 * result + (type != null ? type.hashCode() : 0);
		result = 31 * result + rate;
		result = 31 * result + (description != null ? description.hashCode() : 0);
		result = 31 * result + (preview != null ? preview.hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "Bottle{" +
						"id=" + id +
						", name='" + name + '\'' +
						", type=" + type +
						", rate=" + rate +
						", description='" + description + '\'' +
						", preview='" + preview + '\'' +
						'}';
	}
}
