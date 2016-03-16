<?php

namespace Tests\Acceptance;

use Tests\TestCase;
use App\Entities\Type;

class TypeControllerTest extends TestCase
{
    public function testView()
    {
        $this->visit('/')->see('type">Tipos');
    
        $this->visit('/type')
            ->see('de acesso para esta p', true)
        ;
    }
    
    public function testCreate()
    {
        $this->visit('/type')->see('Novo');
        
        $this->visit('/type/create');
    
        $this->type('Nome Tipo', 'name')
            ->type('Entity Key', 'entity_key')
            ->press('Enviar')
            ->seePageIs('/type')
        ;
    
        $this->seeInDatabase('types', ['name' => 'Nome Tipo', 'entity_key' => 'Entity Key']);
    }

    public function testUpdate()
    {
        $this->visit('/type/'.Type::all()->last()['id'].'/edit');
        
        $this->type('Nome Tipo Editado', 'name')
            ->type('Entity Key Editado', 'entity_key')
            ->press('Enviar')
            ->seePageIs('/type')
        ;
        
        $this->seeInDatabase('types', ['name' => 'Nome Tipo Editado', 'entity_key' => 'Entity Key Editado']);
    }
    
    public function testDelete()
    {
        $this->seeInDatabase('types', ['id' => 1]);
        $this->visit('/type');
        $idOption = $this->crawler->filterXPath("//a[@name='Excluir']")->eq(0)->attr('name');
        $this->click($idOption);
        $this->seeIsSoftDeletedInDatabase('types', ['id' => 1]);
    }
}
