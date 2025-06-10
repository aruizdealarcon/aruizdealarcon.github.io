#!/usr/bin/perl
use strict;
use warnings;
use File::Basename;
use File::Spec;

# Check if the .tex file name is provided as an argument
die "Usage: $0 input.tex\n" unless @ARGV == 1;

# Name of the .tex file to process (first argument from the command line)
my $tex_file = $ARGV[0];

# Directory of the .tex file
my $directory = dirname($tex_file);

# Subroutine to read the content of a file
sub read_file {
    my ($filename) = @_;
    open(my $fh, '<', $filename) or die "Couldn't open file '$filename' $!";
    my $content = do { local $/; <$fh> };
    close($fh);
    return $content;
}

# Subroutine to process a .tex file
sub process_tex_file {
    my ($filename, $directory) = @_;

    my $content = read_file($filename);

    # Check if the content has \input{} and is not commented out
    while ($content =~ /\\input\{([^}]+)\}/g) {
        my $input_file = $1;

        # Skip processing if \input{} is preceded by a %
        next if $content =~ /^\s*%.*\\input\{$input_file\}/m;

        my $input_file_path;

        # Determine whether to add the .tex extension or not
        if ($input_file !~ /\.tex$/) {
            $input_file_path = File::Spec->catfile($directory, "$input_file.tex");
        } else {
            $input_file_path = File::Spec->catfile($directory, $input_file);
        }

        # Print the file being included
        print "Including file: $input_file_path\n";

        # Read the content of the included file
        my $input_content = read_file($input_file_path);

        # Replace the occurrence with the content of the file
        $content =~ s/\\input\{$input_file\}/$input_content/g;

        # Process files within subdirectories recursively
        if (-e $input_file_path && -f $input_file_path) {
            my ($subdir) = $input_file_path =~ /^(.*\/)[^\/]*$/;
            $input_content = process_tex_file($input_file_path, $subdir);
            $content =~ s/\\input\{$input_file\}/$input_content/g;
        }
    }

    return $content;
}

# Process the .tex file
my $processed_content = process_tex_file($tex_file, $directory);

# Name of the output file with "_merged" before the .tex extension
my ($output_filename, $output_directory) = fileparse($tex_file);
$output_filename =~ s/\.tex$/_MERGED.tex/;
my $output_file = File::Spec->catfile($output_directory, $output_filename);

# Save the result to a new file
open(my $fh_out, '>', $output_file) or die "Couldn't open file '$output_file' $!";
print $fh_out $processed_content;
close($fh_out);

print "The processed file has been saved to '$output_file'.\n";
