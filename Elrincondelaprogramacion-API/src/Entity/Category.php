<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * Category
 *
 * @ORM\Table(name="categories", uniqueConstraints={@ORM\UniqueConstraint(name="name", columns={"name"})}, 
 * indexes={@ORM\Index(name="fk_categories_users", columns={"user_id"})})
 * @ORM\Entity
 */
class Category
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
    private $createdAt='current_timestamp()';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updatedAt='current_timestamp()';

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

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user=$user;
        return $this;
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
