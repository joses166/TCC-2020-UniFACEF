package br.com.marqfacil.api.dtos;

import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProcedimentosAtendimentoDto {

	private Integer idprocedimentosatendimento;

	private Integer idatendimento;

	@Min(value = 0L, message = "O atributo idprocedimento deve ser atribuído algum valor.")
	private Integer idprocedimento;

}