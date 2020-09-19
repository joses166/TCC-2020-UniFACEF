package br.com.marqfacil.api.dtos;

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
public class ProcedimentoDto {

	private Integer idprocedimento;

	@NotEmpty(message = "O atributo titulo não pode estar vazio.")
	@NotNull(message = "O atributo titulo não pode ser nulo.")
	@Length(max = 80, message = "O atributo titulo deve possuir no máximo 80 caracteres.")
	private String titulo;

	private byte[] imagem;

	@Length(max = 150, message = "O atributo descricao deve possuir no máximo 150 caracteres.")
	private String descricao;

	@NotNull(message = "O atributo status não pode ser nulo.")
	private Integer status;

	@NotNull(message = "O atributo duracao não pode ser nulo.")
	@Min(value = 0L, message = "O atributo duracao deve possuir um valor positivo.")
	private Integer duracao;

	@NotNull(message = "O atributo idcategoria não pode ser nulo.")
	@Min(value = 0L, message = "O atributo idcategoria deve possuir um valor positivo.")
	private Integer idcategoria;

}