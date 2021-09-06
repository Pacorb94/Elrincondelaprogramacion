<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * Category
 *
 * @ORM\Table(name="categories", uniqueConstraints={@ORM\UniqueConstraint(name="name", columns={"name"})}, 
 * indexes={@ORM\Index(name="fk_categories_users", columns={"user_id"})})
 * @ORM\Entity
 */
class Category implements JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updatedAt;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    public function __construct($user, $name) {
        $this->id=null;
        $this->user=$user;
        $this->name=$name;
        $this->createdAt=new \DateTime('now');
        $this->updatedAt=new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }
    
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user=$user;
        return $this;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt=$updatedAt;
        return $this;
    }

    /**
     * Función que sobreescribe una función de la interfaz "jsonSerializable" en la cual le indicamos
     * las propiedades que queremos serializar 
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'user'=>$this->user,
            'createdAt'=>$this->createdAt,
            'updatedAt'=>$this->updatedAt
        ];
    }

    /**
     * Función que ejecuta una consulta
     * @param $em
     * @param $model
     * @param $action
     */
    public function execute($em, $model, $action)
    {       
        if ($action=='insert'||$action=='update') {
            //Guardamos o modificamos el modelo en el ORM
            $em->persist($model);
        } else if ($action=='delete') {
            $em->remove($model);
        }
        //Ejecutamos la sentencia en la base de datos
        $em->flush();
    }
}
