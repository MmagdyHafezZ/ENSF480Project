package ENSF480.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ENSF480.Backend.Model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    //TODO: Add custom queries here
}
