package br.com.marqfacil.api.dtos;

import java.io.Serializable;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaDto implements Serializable {

	private static final long serialVersionUID = 4023783442249738341L;

	private Integer idcategoria;

	@NotNull(message = "O atributo descrição deve possuir um valor não nulo.")
	@NotEmpty(message = "O atributo descrição deve possuir um valor.")
	@Length(max = 80, message = "O atributo descrição deve possuir no máximo 80 caracteres.")
	private String descricao;

	@Min(value = 0L, message = "O atributo tipo deve possuir um valor válido.")
	private Integer tipo;

	@Min(value = 0L, message = "O atributo idempresa deve possuir um valor válido.")
	private Integer idempresa;

}