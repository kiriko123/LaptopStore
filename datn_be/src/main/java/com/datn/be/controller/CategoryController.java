package com.datn.be.controller;

import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.request.category.CategoryUpdateRequestDTO;
import com.datn.be.dto.response.RestResponse;
import com.datn.be.model.Category;
import com.datn.be.service.CategoryService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/category")
@Validated
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAllBrands(){
        log.info("Get All Brand");
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CategoryCreateRequestDTO categoryCreateRequestDTO) {
        log.info("Create category: {}", categoryCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(categoryCreateRequestDTO));
    }
    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody CategoryUpdateRequestDTO categoryUpdateRequestDTO) {
        log.info("Update category: {}", categoryUpdateRequestDTO);
        log.info("Updating category with ID: {}, active: {}", categoryUpdateRequestDTO.getId(), categoryUpdateRequestDTO.isActive());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(categoryService.update(categoryUpdateRequestDTO));
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> delete(@Min(1)@PathVariable Long id) {
        log.info("Delete category: {}", id);
        categoryService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Category deleted")
                .build();
    }
    @GetMapping
    public ResponseEntity<?> getAll(@Filter Specification<Category> specification, Pageable pageable) {
        log.info("Get all category");
        return ResponseEntity.ok().body(categoryService.getAllCategories(specification, pageable));
    }
}
