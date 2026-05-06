-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'AYUDANTE', 'ESTUDIANTE', 'PROFESOR', 'EXTERNO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'EN_IMPRESION', 'FINALIZADA');

-- CreateEnum
CREATE TYPE "PrioridadSolicitud" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('CONFIRMADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'ESTUDIANTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudImpresion" (
    "id" TEXT NOT NULL,
    "nombreProyecto" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
    "prioridad" "PrioridadSolicitud" NOT NULL DEFAULT 'MEDIA',
    "archivoDiseno3D" TEXT NOT NULL,
    "archivoStl" TEXT NOT NULL,
    "fechaSolicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,
    "autorId" TEXT NOT NULL,
    "grupoId" TEXT,

    CONSTRAINT "SolicitudImpresion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioInterno" (
    "id" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solicitudId" TEXT NOT NULL,
    "ayudanteId" TEXT NOT NULL,

    CONSTRAINT "ComentarioInterno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" TEXT NOT NULL,
    "tipoMaterial" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "gramosDisponibles" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaSala" (
    "id" TEXT NOT NULL,
    "fechaReserva" DATE NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFin" TIME NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'CONFIRMADA',
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "ReservaSala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "nombreModulo" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nombreGrupo" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_rut_key" ON "Usuario"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "SolicitudImpresion" ADD CONSTRAINT "SolicitudImpresion_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudImpresion" ADD CONSTRAINT "SolicitudImpresion_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioInterno" ADD CONSTRAINT "ComentarioInterno_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "SolicitudImpresion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioInterno" ADD CONSTRAINT "ComentarioInterno_ayudanteId_fkey" FOREIGN KEY ("ayudanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaSala" ADD CONSTRAINT "ReservaSala_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
