using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace empresa_api.Models
{
    public partial class companyContext : DbContext
    {
        public companyContext()
        {
        }

        public companyContext(DbContextOptions<companyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bonus> Bonus { get; set; } = null!;
        public virtual DbSet<BonusEmployee> BonusEmployees { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bonus>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(6, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.BonusName)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("bonusName");
            });

            modelBuilder.Entity<BonusEmployee>(entity =>
            {
                entity.ToTable("Bonus_employee");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BonusId).HasColumnName("bonusId");

                entity.Property(e => e.EmployeeId).HasColumnName("employeeId");

                entity.HasOne(d => d.Bonus)
                    .WithMany(p => p.BonusEmployees)
                    .HasForeignKey(d => d.BonusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bonus_emp__bonus__3B75D760");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.BonusEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bonus_emp__emplo__3A81B327");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BaseSalary)
                    .HasColumnType("decimal(12, 2)")
                    .HasColumnName("baseSalary");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("createdAt");

                entity.Property(e => e.Dpi)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("DPI");

                entity.Property(e => e.FullName)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("fullName");

                entity.Property(e => e.NumberChildren).HasColumnName("numberChildren");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__status__36B12243");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "uc_email")
                    .IsUnique();

                entity.HasIndex(e => e.Username, "uc_username")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BirthDate)
                    .HasColumnType("datetime")
                    .HasColumnName("birth_date");

                entity.Property(e => e.Email)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
