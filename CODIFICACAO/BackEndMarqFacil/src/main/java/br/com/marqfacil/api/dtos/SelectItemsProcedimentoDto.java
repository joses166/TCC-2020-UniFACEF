package br.com.marqfacil.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectItemsProcedimentoDto {

	private Integer idprocedimento;
	private String descricao;
	private Integer idcategoria;
	private String categoria;

}