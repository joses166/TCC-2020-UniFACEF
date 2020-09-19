package br.com.marqfacil.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcedimentosAtendimentoInfoDto {

	private Integer idprocedimentosatendimento;
	private Integer idatendimento;
	private Integer idprocedimento;
	private String nomeprocedimento;

}
